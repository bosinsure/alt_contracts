const BosiToken = artifacts.require('BosiToken');
const BosiCrowdsale = artifacts.require('BosiCrowdsale');

const gasPrice = 10000000000; //  Setting default gas price at 10 gwei

module.exports = function(deployer, network, accounts) {
  
  // This script deploys the Token and Crowdsale contracts to the specified network.
  // The general steps of deployment are:
  // 1 - deploy Token using account[0]
  // 2 - get Token_Address
  // 3 - deploy Crowdsale with Token_Address as parameter using account[0]
  // 4 - transfer ownership of Token from account[0] to Crowdsale -- Manual
  // 5 - transfer ownership of Crowdsale from account[0] to Owner -- Manual

  //TODO use start and end time in config file in production
  const openingTime = web3.eth.getBlock('latest').timestamp + 2; // two secs in the future
  const closingTime = openingTime + 86400 * 7; // 20 days

  deployer.deploy(
    BosiToken, {gas: 3900000, gasPrice: gasPrice}
  )
  .then(() => {
    console.log('** BosiToken deployed at : ' + BosiToken.address + ' **');
  })
  .then(() => {
    return deployer.deploy(
      BosiCrowdsale,
      openingTime,
      closingTime,
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
