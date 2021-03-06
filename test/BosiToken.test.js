import { assertRevert } from '../node_modules/openzeppelin-solidity/test/helpers/assertRevert';

var BosiToken = artifacts.require('BosiToken');

contract('BosiToken', function ([owner, beneficiary1, beneficiary2, beneficiary3]) {

  const TOTALSUPPLY = 990000000 * (10 ** 18);

  beforeEach(async function () {
    this.token = await BosiToken.new();
  });

  it('returns the correct totalSupply after construction', async function () {
    const _totalSupply = await this.token.totalSupply();
    assert.equal(_totalSupply, TOTALSUPPLY);
  })

  it('has an owner', async function () {
    const _owner = await this.token.owner();
    assert.equal(_owner, owner);
  })

  it('returns the right owner balance on creation', async function () {
    const owner_balance = await this.token.balanceOf(owner);
    assert.equal(owner_balance, TOTALSUPPLY);
  })

  it('returns the right balances after transfer', async function () {
    await this.token.transfer(beneficiary1, 1000);
    await this.token.transfer(beneficiary2, 400, {from: beneficiary1});
    const owner_balance = await this.token.balanceOf(owner);
    const beneficiary1_balance = await this.token.balanceOf(beneficiary1);
    const beneficiary2_balance = await this.token.balanceOf(beneficiary2);

    assert.equal(beneficiary1_balance, 600);
    assert.equal(beneficiary2_balance, 400);
  })

  it('reverts when trying to transfer to 0x0', async function () {
    await assertRevert(this.token.transfer(0x0, 100));
   })

   it('reverts when transfer amount > balance', async function () {
     await assertRevert(this.token.transfer(beneficiary2, 100, {from: beneficiary1}));
   })


})
