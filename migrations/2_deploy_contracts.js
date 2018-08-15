const BosiToken = artifacts.require('BosiToken');

const gasPrice = 10000000000; //  Setting default gas price at 10 gwei

module.exports = function(deployer, network) {
  deployer.deploy(
    BosiToken, {gas: 3900000, gasPrice: gasPrice}
  )
  .then(() => {
    console.log('** BosiToken deployed at : ' + BosiToken.address);
  })
}
