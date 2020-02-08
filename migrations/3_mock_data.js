const SupplyChainTracker = artifacts.require("SupplyChainTracker");

module.exports = async function(deployer, network, accounts){
    let supplyChainInstance = await SupplyChainTracker.deployed();
    await supplyChainInstance.startSupply(0,1580799650,138,0);
    await supplyChainInstance.appendSupply(0, 2, 1580886382,140,0);
    await supplyChainInstance.appendSupply(0, 4, 1580972805,130,0);
    await supplyChainInstance.appendSupply(0,4, 1581059217,134,1);
    await supplyChainInstance.appendSupply(0,6,1581145627,138,5);

    await supplyChainInstance.startSupply(0,1580799650,138,0);
    await supplyChainInstance.appendSupply(1, 2, 1580886382,140,0);
    await supplyChainInstance.appendSupply(1, 4, 1580972805,130,0);
    await supplyChainInstance.appendSupply(1,4, 1581059217,134,1);

    await supplyChainInstance.startSupply(1,1580799650,138,0);
    await supplyChainInstance.appendSupply(2, 3, 1580886382,140,0);
    await supplyChainInstance.appendSupply(2, 3, 1580972805,130,1);
    await supplyChainInstance.appendSupply(2,5, 1581059217,134,1);
    await supplyChainInstance.appendSupply(2,5,1581145627,138,0);
    await supplyChainInstance.appendSupply(2,7,1581145627,138,5);

    await supplyChainInstance.startSupply(1,1580799650,144,0);
    await supplyChainInstance.appendSupply(3, 2, 1580886382,143,0);
    await supplyChainInstance.appendSupply(3, 5, 1580972805,163,1);
    await supplyChainInstance.appendSupply(3,5, 1581059217,164,0);
    await supplyChainInstance.appendSupply(3,5,1581145627,163, 3);

    await supplyChainInstance.startSupply(0,1580799650,138,0);
    await supplyChainInstance.appendSupply(4, 2, 1580886382,140,0);
    await supplyChainInstance.appendSupply(4, 4, 1580972805,130,1);
    await supplyChainInstance.appendSupply(4,4, 1581059217,134,4);

    await supplyChainInstance.startSupply(1,1580799650,138,0);
    await supplyChainInstance.appendSupply(5, 2, 1580886382,140,0);
    await supplyChainInstance.appendSupply(5, 5, 1580972805,130,1);
    await supplyChainInstance.appendSupply(5,5, 1581059217,134,2);
}