var AccessToken = artifacts.require('AccessToken');

module.exports = function(deployer) {
  deployer.deploy(AccessToken);
};
