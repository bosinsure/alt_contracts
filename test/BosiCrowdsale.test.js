import { ether } from "../node_modules/openzeppelin-solidity/test/helpers/ether";
import { advanceBlock } from "../node_modules/openzeppelin-solidity/test/helpers/advanceToBlock";
import { increaseTimeTo, duration } from "../node_modules/openzeppelin-solidity/test/helpers/increaseTime";
import { latestTime } from "../node_modules/openzeppelin-solidity/test/helpers/latestTime";
import EVMRevert from "../node_modules/openzeppelin-solidity/test/helpers/EVMRevert";

const BigNumber = web3.BigNumber;

// require('chai')
//     .use(require('chai-bignumber')(BigNumber))
//     .should();

const Crowdsale = artifacts.require("BosiCrowdsale");
const Token = artifacts.require("BosiToken");





contract("BosiCrowdsale", function([_, owner, investor, wallet, token_address, purchaser, thirdparty]){
    const tokensPerEther = new BigNumber(1000);
    const value = ether(1.2);
    const goal = ether(50);
    const expectedTokenAmount = tokensPerEther.mul(value);
    const cap = ether(3);
    const lessThanCap = ether(2.5);
    
    before(async function () {
        // Advance to the next block to correctly read time in the solidity "now" function interpreted by testrpc
        await advanceBlock();
    });

    var DHTokenInstance = Token.at(Token.address);
    var DHTokenSaleInstance = Crowdsale.at(Crowdsale.address);

    beforeEach(async function () {
        this.startTime = (await latestTime()) + duration.weeks(1);
        this.endTime = this.startTime + duration.weeks(1);
        this.afterEndTime = this.endTime + duration.seconds(1);

        this.token = await Token.new();
        this.crowdsale = await Crowdsale.new(
            this.startTime, this.endTime, tokensPerEther, wallet, this.token.address, goal, cap, { from: owner }
        );
    });

    it('should be token owner by default', async function () {
       const _owner =  await this.token.owner();
       assert.equal(_owner, _);
        // const owner = await DHTokenInstance.owner();
        // assert.equal(owner, DHTokenSaleInstance.address);
        // owner.should.equal(DHTokenSaleInstance.address);
    });
    
})