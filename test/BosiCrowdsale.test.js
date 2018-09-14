import { ether } from "../node_modules/openzeppelin-solidity/test/helpers/ether";
import { advanceBlock } from "../node_modules/openzeppelin-solidity/test/helpers/advanceToBlock";
import { increaseTimeTo, duration } from "../node_modules/openzeppelin-solidity/test/helpers/increaseTime";
import { latestTime } from "../node_modules/openzeppelin-solidity/test/helpers/latestTime";
import EVMRevert from "../node_modules/openzeppelin-solidity/test/helpers/EVMRevert";

const BigNumber = web3.BigNumber;

const should = require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

const Crowdsale = artifacts.require("BosiCrowdsale");
const Token = artifacts.require("BosiToken");





contract("BosiCrowdsale", function([_, owner, investor, wallet, token_address, purchaser, thirdparty, multisig]){
    const tokensPerEther = new BigNumber(3000);
    const value = ether(1.2);
    const goal = ether(50);
    const expectedTokenAmount = tokensPerEther.mul(value);
    const cap = ether(3);
    const lessThanCap = ether(2.5);
    
    before(async function () {
        // Advance to the next block to correctly read time in the solidity "now" function interpreted by testrpc
        await advanceBlock();
    });

    // var DHTokenInstance = Token.at(Token.address);
    // var DHTokenSaleInstance = Crowdsale.at(Crowdsale.address);

    beforeEach(async function () {
        this.startTime = (await latestTime()) + duration.weeks(1);
        this.endTime = this.startTime + duration.weeks(1);
        this.afterEndTime = this.endTime + duration.seconds(1);
        this.supply = 495000000 * (10 ** 18);

        this.token = await Token.new();
        this.crowdsale = await Crowdsale.new(this.startTime, this.endTime, this.token.address, { from: owner } );
        await this.token.transfer(this.crowdsale.address, this.supply);
        this.token.transferOwnership(this.crowdsale.address);
        this.crowdsale.transferOwnership(multisig, { from: owner });
    });

    it('crowdsale contract should be owner of token contract', async function () {
        const _owner = await this.token.owner();
        _owner.should.equal(this.crowdsale.address);
    });

    it('crowdsale contract should hold half of totalSupply', async function () {
        const balance = (await this.token.balanceOf(this.crowdsale.address)).toNumber();
        const tokens = this.supply;
        balance.should.equal(tokens);
    });

    it('multisig should be owner of crowdsale contract', async function () {
        const _owner = await this.crowdsale.owner();
        _owner.should.equal(multisig);
    });

    it('hasSaleEnded should return false before end_time', async function () {
        let ended = await this.crowdsale.hasSaleEnded();
        ended.should.equal(false);

    });

    it('hasSaleEnded should return true after end_time', async function () {
        await increaseTimeTo(this.afterEndTime);
        let ended = await this.crowdsale.hasSaleEnded();
        ended.should.equal(true);
    });

    it('multisig can setWeiRaisedFromOthers', async function () {
        const amount = 100000
        await this.crowdsale.setWeiRaisedFromOthers(amount, {from: owner}).should.be.rejectedWith(EVMRevert);
        await this.crowdsale.setWeiRaisedFromOthers(amount, {from: multisig});
        const wei = await this.crowdsale.weiRaisedFromOthers();
        assert.equal(wei, amount);
    });

    it('hasSaleEnded should return true after cap is reached', async function () {
        const amount = 100000 * (10 ** 18)
        await this.crowdsale.setWeiRaisedFromOthers(amount, { from: multisig });
        let ended = await this.crowdsale.hasSaleEnded();
        ended.should.equal(true);
    });

    it('should reject payments before start', async function () {
        await this.crowdsale.send(value).should.be.rejectedWith(EVMRevert);
        await this.crowdsale.buyTokens(investor, { from: purchaser, value: value }).should.be.rejectedWith(EVMRevert);
    });

    it('should accept payments after start', async function () {
        await increaseTimeTo(this.startTime);
        await this.crowdsale.send(value).should.be.fulfilled;
        await this.crowdsale.buyTokens(investor, { value: value, from: purchaser }).should.be.fulfilled;
    });

    it('hasSaleEnded should return true after cap is reached', async function () {
        await increaseTimeTo(this.startTime);
        await this.crowdsale.send(value).should.be.fulfilled;
        await this.crowdsale.buyTokens(purchaser, { value: value, from: purchaser });
        let balance = (await this.token.balanceOf(purchaser)).toNumber();
        balance.should.equal(3600000000000000000000);
    });

    




    
})