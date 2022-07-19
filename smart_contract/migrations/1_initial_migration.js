const MultisigFactory = artifacts.require("MultisigFactory");

module.exports = function (deployer) {
  deployer.deploy(MultisigFactory);
};
