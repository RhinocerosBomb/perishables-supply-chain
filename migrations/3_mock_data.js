const SupplyChainTracker = artifacts.require("SupplyChainTracker");

module.exports = async function(deployer, network, accounts){
    let supplyChainInstance = await SupplyChainTracker.deployed();
    supplyChainInstance.startSupply(1,20200207,1,1);
    supplyChainInstance.appendSupply(1,1,20200207,1,1);
    supplyChainInstance.appendSupply(2,1,20200207,30,1);
    

}