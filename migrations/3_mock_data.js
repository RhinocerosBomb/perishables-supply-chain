const SupplyChainTracker = artifacts.require("SupplyChainTracker");

module.exports = async function(deployer, network, accounts){
    let supplyChainInstance = await SupplyChainTracker.deployed();
    supplyChainInstance.startSupply(1,20200207,10,0);
    supplyChainInstance.appendSupply(1,1,20200207,10,0);
    supplyChainInstance.appendSupply(2,4,20200207,30,0);
    supplyChainInstance.appendSupply(3,3,20200202,30,1);
    supplyChainInstance.appendSupply(4,2,20200207,10,2);
    supplyChainInstance.appendSupply(5,4,20200203,15,0);

}