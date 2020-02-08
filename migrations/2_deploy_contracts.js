const SupplyChainTracker = artifacts.require("SupplyChainTracker");
const fs = require('fs');

module.exports = async function(deployer, network, accounts) {
  deployer.deploy(SupplyChainTracker)
  // .then(async() => {
  //     const fileContent = await require("../build/contracts/SupplyChainTracker.json");
  //     const contractConfiguration = {
  //       contract: fileContent,
  //       contractAddress: SupplyChainTracker.address,
  //       owner: accounts[0]
  //   };
    
  //   // Copy contract ABI, contract address, and owner address to the client folder
  //   fs.writeFileSync('client/src/contractConfigurations.json', JSON.stringify(contractConfiguration), { flag: 'w' });
  // });
};
