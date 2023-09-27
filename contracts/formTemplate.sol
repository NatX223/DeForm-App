// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import "@tableland/evm/contracts/utils/SQLHelpers.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface RouterContract {
    function addTable(address formOwner, string memory tablePrefix, address tableContract, uint256 tableId) external;
}

interface MarketPlace {
    function listDataset(uint256 price, uint256 tablelandId, address lister, address listerContract, uint256 responseCount, string memory tableName, string memory tableDescription) external;
    function delistDataset(uint256 id) external;
}

contract userTables is ERC721Holder, ERC1155 {
    using Counters for Counters.Counter; // OpenZepplin Counter
    Counters.Counter private _tableCount; // Counter For Proposals

    address public owner;
    address public controllerContract;
    address public marketAddress;

    IERC721 Tableland;
    RouterContract routerContract;
    MarketPlace marketPlace;

    // table struct
    struct Table {
        uint256 tableId;
        uint256 tablelandId;
        string tablePrefix;
        string tableName;
        string description;
        uint256 responseCount;
    }

    // struct of reward
    struct Reward {
        uint256 totalAmount;
        uint256 singleAmount;
        address tokenAddress;
    }

    // mapping table counters to tables
    mapping (uint256 => Table) Tables;

    // mapping of a table id to the reward for the table
    mapping (uint256 => Reward) tableReward;

    // mapping of ids to writeString
    mapping (uint256 => string) writeQueries;

    // mapping to check if a filling a table is rewarded with an NFT
    mapping (uint256 => bool) mintable;

    constructor(address _routerContract, address _controllerContract, address registryAddress, address _marketPlace) ERC1155("hash") {
        owner = msg.sender;
        routerContract = RouterContract(_routerContract);
        controllerContract = _controllerContract;
        Tableland = IERC721(registryAddress);
        marketPlace = MarketPlace(_marketPlace);
        marketAddress = _marketPlace;
    }

    // function to create a table
    // try creating the table first then
    // setting the access controller to the contract
    function createTable(string memory tablePrefix, string memory createString, string memory description, string memory writeQuery) public onlyOwner {

        uint256 id = TablelandDeployments.get().create( // creating a table ID
            address(this), // setting it's owner to the address for easy write access
            SQLHelpers.toCreateFromSchema(
                string.concat("id integer primary key,", createString),
                tablePrefix // the needed prefix for table
            )
        );

        string memory tableName = string.concat(
            tablePrefix, "_", Strings.toString(block.chainid), "_", Strings.toString(id)
        );

        Tables[_tableCount.current()].description = description;
        Tables[_tableCount.current()].tablePrefix = tablePrefix;
        Tables[_tableCount.current()].tableId = _tableCount.current();
        Tables[_tableCount.current()].tablelandId = id;
        Tables[_tableCount.current()].tableName = tableName;
        
        TablelandDeployments.get().setController(address(this), id, controllerContract);
        
        writeQueries[_tableCount.current()] = writeQuery;
        
        routerContract.addTable(msg.sender, tablePrefix, address(this), _tableCount.current());
        _tableCount.increment();
    }

    // implement access control
    function getTableName(uint256 id) public view returns(string memory tableName) {
        tableName = Tables[id].tableName;
    }

    function getColumns(uint256 id) public view returns(string memory columns) {
        columns = writeQueries[id];
    }

    // function to write to a table
    // implements tableland access control function for fees
    function writeTable(uint256 id, string[] memory responses) public payable {
          string memory response = concatWriteArray(responses);
          string memory writeQuery = writeQueries[id];
        //   check for native rewards
          if (address(this).balance > tableReward[id].singleAmount && tableReward[id].totalAmount > 0) {
          TablelandDeployments.get().mutate{value:msg.value}(
            address(this),
            Tables[id].tablelandId,
            SQLHelpers.toInsert(
            Tables[id].tablePrefix,
            Tables[id].tablelandId,
            string.concat("id,", writeQuery),
            string.concat(
            Strings.toString(Tables[id].responseCount), // Convert to a string
            ",",
            response
            )
            )
        );

        (bool sent, bytes memory data) = payable(msg.sender).call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        Tables[id].responseCount += 1;
          } else {
            TablelandDeployments.get().mutate{value:msg.value}(
            address(this),
            Tables[id].tablelandId,
            SQLHelpers.toInsert(
            Tables[id].tablePrefix,
            Tables[id].tablelandId,
            string.concat("id,", writeQuery),
            string.concat(
            Strings.toString(Tables[id].responseCount), // Convert to a string
            ",",
            response
            )
            )
        );
        Tables[id].responseCount += 1;
        }

    }

    function getCount() public view returns(uint256) {
        return _tableCount.current();
    }

    function getTable(uint256 id) public view returns(uint256, string memory, string memory, string memory, uint256) {
        return(Tables[id].tableId, Tables[id].tablePrefix, Tables[id].description, writeQueries[id], Tables[id].responseCount);
    }

    // function to list Table
    function listTable(uint256 id, uint256 price) public onlyOwner {
        marketPlace.listDataset(price, Tables[id].tablelandId, msg.sender, address(this), Tables[id].responseCount, Tables[id].tablePrefix, Tables[id].description);
        Tableland.approve(marketAddress, Tables[id].tablelandId);
    }

    function concatWriteArray(string[] memory fields) internal pure returns (string memory) {
        string memory queryString;
        for (uint i = 0; i < fields.length; i++) {
            if(i == (fields.length - 1)) {
            queryString = string.concat(
                queryString,
                SQLHelpers.quote(fields[i])
            );
            }
            else {
            queryString = string.concat(
                queryString,
                SQLHelpers.quote(fields[i]), ","
            );
            }
        }
        return queryString;
    }

    // function to uppdate controller
    function updateController(uint256 id, address controller) public onlyOwner {
        TablelandDeployments.get().setController(address(this), Tables[id].tablelandId, controller);
    }

    // function to add a reward for filling a form
    function addRewardNative(uint256 id, uint256 singleAmount) public payable onlyOwner {
        // map it to the tableId
        tableReward[id].totalAmount = msg.value;
        // define what each response should get
        tableReward[id].singleAmount = singleAmount;
    }

    // implement addFee function
    // prolly do that with tableland access control

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
}

