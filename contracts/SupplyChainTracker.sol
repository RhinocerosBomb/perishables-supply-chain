pragma solidity ^0.5.16;
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Roles.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

contract SupplyChainTracker is Ownable {
    using SafeMath for uint256;
    using Roles for Roles.Role;

    struct Note {
        uint16 locationId;
        uint32 timeStamp;
        uint8 condition;
        uint8 temperature; // For example: 0 == "Active", 1 == "expired", 2 == "IOT Malfunction"
    }

    uint256 private numOfItems;
    mapping(uint256 => mapping(uint256 => Note)) tracker; // itemId => stage => Note
    mapping(uint256 => uint256) stageOfItem; // Sequential Nonce
    mapping(uint256 => Roles.Role) locationIdToRole; // For example: 0 => brewery1, 1 => brewery2, 2 => retail1...
    Roles.Role[] roles;

    modifier isOwnerOrHasRole(Roles.Role storage role) {
        require(isOwner() || role.has(msg.sender), "Must be owner or belong to correct role to perform this action");
        _;
    }

    function addRole(uint256 roleId, address user) external isOwnerOrHasRole(roles[roleId]){
        roles[roleId].add(user);
    }

    function removeRole(uint256 roleId, address user) external isOwnerOrHasRole(roles[roleId]){
        roles[roleId].remove(user);
    }

    function startSupply(uint16 locationId, uint32 timeStamp, uint8 temperature, uint8 condition) external returns (uint256) {
        addSupplyEntry(numOfItems, locationId, timeStamp, temperature, condition);
        uint256 itemId = numOfItems;
        numOfItems = numOfItems.add(1);
        return itemId;
    }

    function appendSupply(uint256 itemId, uint16 locationId, uint32 timeStamp, uint8 temperature, uint8 condition) external {
        require(hasItem(itemId), "Item does not exist");
        addSupplyEntry(itemId, locationId, timeStamp, temperature, condition);
        numOfItems = numOfItems.add(1);
        stageOfItem[itemId] = stageOfItem[itemId].add(1);
    }

    function addSupplyEntry(uint256 itemId, uint16 locationId, uint32 timeStamp, uint8 temperature, uint8 condition)
        internal isOwnerOrHasRole(locationIdToRole[locationId]) {
            tracker[itemId][stageOfItem[itemId]] = Note(locationId, timeStamp, temperature, condition);
    }

    function getSuppliesLatest() external view returns (bytes memory) {
        require(numOfItems > 0, "There are no items");
        Note memory tempNote = tracker[0][stageOfItem[0]];
        bytes memory suppliesLatest = abi.encodePacked(tempNote.locationId, tempNote.timeStamp, tempNote.temperature, tempNote.condition);
        for (uint i = 1; i < numOfItems; i++) {
            tempNote = tracker[i][stageOfItem[i]];
            suppliesLatest = abi.encodePacked(suppliesLatest, tempNote.locationId, tempNote.timeStamp, tempNote.temperature, tempNote.condition);
        }

        return suppliesLatest;
    }

    function getSupplyLogs(uint256 itemId) external view returns (bytes memory) {
        require(hasItem(itemId), "Item does not exist");
        Note memory tempNote = tracker[itemId][0];
        bytes memory suppliesLatest = abi.encodePacked(tempNote.locationId, tempNote.timeStamp, tempNote.temperature, tempNote.condition);
        for (uint i = 1; i < stageOfItem[itemId]; i++) {
            tempNote = tracker[itemId][i];
            suppliesLatest = abi.encodePacked(suppliesLatest, tempNote.locationId, tempNote.timeStamp, tempNote.temperature, tempNote.condition);
        }

        return suppliesLatest;
    }

    function hasItem(uint256 itemId) public view returns (bool) {
        return itemId < numOfItems;
    }

    function () external {
        revert('Contract does not accept Eth');
    }
}
