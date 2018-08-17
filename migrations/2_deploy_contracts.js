const BosiToken = artifacts.require('BosiToken');
const BosiCrowdsale = artifacts.require('BosiCrowdsale');

const gasPrice = 10000000000; //  Setting default gas price at 10 gwei

module.exports = function(deployer, network, accounts) {
  // const openingTime = web3.eth.getBlock('latest').timestamp + 2; // two secs in the future
  // const closingTime = openingTime + 86400 * 20; // 20 days
  // const rate = new web3.BigNumber(3000);
  // const wallet = "0x4f713d697c053278b0f9aa272061dbf17ba0ee3cdda18e687755a7bf00dfd5b7";
  // const goal = 1000 * (10 ** 18);
  // const cap = 9000 * (10 ** 18);

  deployer.deploy(
    BosiToken, {gas: 3900000, gasPrice: gasPrice}
  )
  .then(() => {
    console.log('** BosiToken deployed at : ' + BosiToken.address + ' **');
  })
  .then(() => {
    return deployer.deploy(
      BosiCrowdsale,
      // openingTime,
      // closingTime,
      // rate,
      // wallet,
      BosiToken.address
      // goal,
      // cap
    ).then(() => {
      console.log('** BosiCrowdsale deployed at : ' + BosiCrowdsale.address + ' **');
      console.log('** Deployment completed! **');
    });
  })
  .catch(e => console.log(e));
}
