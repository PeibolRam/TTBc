/* eslint-disable no-undef */

const Houses = artifacts.require("Houses");

module.exports = async function(deployer) {

  await deployer.deploy(Houses);
  const houses = await Houses.deployed();
};
