const SupplyChainTracker = artifacts.require("SupplyChainTracker");

module.exports = async function(deployer, network, accounts){
    let supplyChainInstance = await SupplyChainTracker.deployed();
    await supplyChainInstance.startSupply(0,1580799650,138,0);
    await supplyChainInstance.appendSupply(0, 2, 1580886382,140,0);
    await supplyChainInstance.appendSupply(0, 4, 1580972805,130,0);
    await supplyChainInstance.appendSupply(0,4, 1581059217,134,1);
    await supplyChainInstance.appendSupply(0,6,1581145627,138,0);

    await supplyChainInstance.startSupply(1,1580799650,138,0);
    await supplyChainInstance.appendSupply(1, 3, 1580886382,140,0);
    await supplyChainInstance.appendSupply(1, 3, 1580972805,130,1);
    await supplyChainInstance.appendSupply(1,5, 1581059217,134,0);
    await supplyChainInstance.appendSupply(1,5,1581145627,138,1);
    await supplyChainInstance.appendSupply(1,7,1581145627,138,0);

    // await supplyChainInstance.appendSupply(0, );
    // await supplyChainInstance.startSupply(1,20200207,10,0);
    // await supplyChainInstance.startSupply(2,20200207,10,0);
    // await supplyChainInstance.startSupply(3,20200207,10,0);
    // supplyChainInstance.appendSupply(1,1,20200207,10,0);
    // supplyChainInstance.appendSupply(2,4,20200207,30,0);
    // supplyChainInstance.appendSupply(3,3,20200202,30,1);
    // supplyChainInstance.appendSupply(4,2,20200207,10,2);
    // supplyChainInstance.appendSupply(5,4,20200203,15,0);

}