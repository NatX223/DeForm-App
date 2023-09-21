// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import "@tableland/evm/contracts/utils/SQLHelpers.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract userTables is ERC721Holder {
    using Counters for Counters.Counter; // OpenZepplin Counter
    Counters.Counter private _tableCount; // Counter For Proposals

    address public owner;

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

    // mapping tableIds to field names
    mapping (uint256 => string[]) fieldNames;

    // mapping of a table id to the reward for the table
    mapping (uint256 => Reward) tableReward;

    constructor() {
        owner = msg.sender;
    }

    // function to create a table
    function createTable(string memory tablePrefix, string[] memory fieldName, string[] memory fieldType, string memory description) public onlyOwner {
        require(fieldName.length == fieldType.length && fieldName.length == 5);

        string memory createQuery = concatCreationArray(fieldName, fieldType);
        uint256 id = TablelandDeployments.get().create( // creating a table ID
            address(this), // setting it's owner to the address for easy write access
            SQLHelpers.toCreateFromSchema(
                createQuery,
                tablePrefix // the needed prefix for table
            )
        );
        Tables[_tableCount.current()].description = description;
        Tables[_tableCount.current()].tablePrefix = tablePrefix;
        Tables[_tableCount.current()].tableId = id;
        Tables[_tableCount.current()].responseCount = 0;
        Tables[_tableCount.current()].tableName = string.concat(
            tablePrefix, "_", Strings.toString(block.chainid), "_", Strings.toString(id)
        );
        fieldNames[_tableCount.current()] = fieldName;
        _tableCount.increment();
    }

    // function to return table
    function getTable(uint256 id) public view returns(uint256, string memory, string memory, string memory) {
        return (Tables[id].tableId, Tables[id].tablePrefix, Tables[id].tableName, Tables[id].description);
    }

    // function to write to a table
    // implement function to check if an answer is correct
    function writeTable(uint256 id, string[] memory responses) public payable {
          string memory writeQuery = concatWriteArray(fieldNames[id]);
          string memory inputString = concatWriteArray(responses);
          TablelandDeployments.get().mutate(
            address(this),
            Tables[id].tableId,
            SQLHelpers.toInsert(
            Tables[id].tablePrefix,
            Tables[id].tableId,
            writeQuery,
            inputString
            )
        );

        if (address(this).balance >= tableReward[id].singleAmount && tableReward[id].totalAmount >= tableReward[id].singleAmount) {
            (bool sent, bytes memory data) = payable(msg.sender).call{value: tableReward[id].singleAmount}("");
            require(sent, "failed to send ether");
        }

        if (IERC20(tableReward[id].tokenAddress).balanceOf(address(this)) >= tableReward[id].singleAmount && tableReward[id].totalAmount >= tableReward[id].singleAmount) {
            IERC20(tableReward[id].tokenAddress).transfer(msg.sender, tableReward[id].singleAmount);
        }
    }

    function concatCreationArray(string[] memory fields, string[] memory types) internal pure returns (string memory) {
        require(fields.length == types.length);
        string memory queryString;
        for (uint i = 0; i < fields.length; i++) {
            if (i == 0) {
            queryString = string.concat(
                fields[i], " ", types[i], " ", "primary key", ","
            );
            } else if(i == (fields.length - 1)) {
            queryString = string.concat(
                queryString,
                fields[i], " ", types[i]
            );
            }
            else {
            queryString = string.concat(
                queryString,
                fields[i], " ", types[i], ","
            );
            }
        }
        return queryString;
    }

    function concatWriteArray(string[] memory fields) internal pure returns (string memory) {
        string memory queryString;
        for (uint i = 0; i < fields.length; i++) {
            if(i == (fields.length - 1)) {
            queryString = string.concat(
                queryString,
                fields[i]
            );
            }
            else {
            queryString = string.concat(
                queryString,
                fields[i], ","
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

