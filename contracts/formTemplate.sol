// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import "@tableland/evm/contracts/utils/SQLHelpers.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface RouterContract {
    function addTable(address formOwner, string memory tableName, address tableContract, uint256 tableId) external;
}

contract userTables is ERC721Holder {
    using Counters for Counters.Counter; // OpenZepplin Counter
    Counters.Counter private _tableCount; // Counter For Proposals

    address public owner;
    RouterContract routerContract;

    // table struct
    struct Table {
        uint256 tableId;
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

    // mapping of a table prefix to the table name
    mapping (string => string) tableNames;

    // mapping of ids to writeString
    mapping (uint256 => string) writeQueries;

    constructor(address _routerContract) {
        owner = msg.sender;
        routerContract = RouterContract(_routerContract);
    }

    // function to create a table
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
        Tables[_tableCount.current()].tableId = id;
        Tables[_tableCount.current()].tableName = tableName;

        tableNames[tablePrefix] = tableName;
        writeQueries[_tableCount.current()] = writeQuery;
        
        _tableCount.increment();
    }

    // function to return table
    function getTable(uint256 id) public view returns(Table memory, string memory) {
        return (Tables[id], writeQueries[id]);
    }

    // function to write to a table
    // implement function to check if an answer is correct
    function writeTable(uint256 id, string[] memory responses) public payable { // implement tableland access control function for fees
          string memory response = concatWriteArray(responses);
          string memory writeQuery = writeQueries[id];
          TablelandDeployments.get().mutate(
            address(this),
            Tables[id].tableId,
            SQLHelpers.toInsert(
            Tables[id].tablePrefix,
            Tables[id].tableId,
            string.concat("id,", writeQuery),
            string.concat(
            Strings.toString(Tables[id].responseCount), // Convert to a string
            ",",
            response
            )
            )
        );

        Tables[_tableCount.current()].responseCount += 1;
    }

    function getResponseCount(uint256 id) public view returns(uint256) {
        return Tables[id].responseCount;
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

    // function to add a reward for filling a form
    function addRewardNative(uint256 id, uint256 singleAmount) public payable onlyOwner {
        // map it to the tableId
        tableReward[id].totalAmount = msg.value;
        // define what each response should get
        tableReward[id].singleAmount = singleAmount;
    }

    // function to add a reward for filling a form
    function addRewardToken(uint256 id, uint256 totalAmount, uint256 singleAmount, address tokenAddress) public onlyOwner {
        // put some tokens into the contract
        IERC20(tokenAddress).transferFrom(msg.sender, address(this), totalAmount);
        
        tableReward[id].totalAmount = totalAmount;
        // define what each response should get
        tableReward[id].singleAmount = singleAmount;
        tableReward[id].tokenAddress = tokenAddress;
    }  

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
}

