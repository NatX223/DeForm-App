// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import "@tableland/evm/contracts/utils/SQLHelpers.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract userTables is ERC721Holder {
    using Counters for Counters.Counter; // OpenZepplin Counter
    Counters.Counter private _tableCount; // Counter For Proposals

    // uint256 public _tableId;
    // string private constant _TABLE_PREFIX = "first_table";
    address public owner;

    // the chain it will be deployed to
    uint256 public chainId;

    // table struct
    struct Table {
        uint256 tableId;
        string tablePrefix;
        string tableName;
        string description;
    }

    // mapping table counters to tables
    mapping (uint256 => Table) Tables;

    // mapping tableIds to field names
    mapping (uint256 => string[]) fieldNames;

    constructor(uint256 _chainId) {
        owner = msg.sender;
        chainId = _chainId;
    }

    // function to create a table
    function createTable(string memory tablePrefix, string[] memory fieldName, string[] memory fieldType, string memory description) public {
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
        Tables[_tableCount.current()].tableName = string.concat(
            tablePrefix, "_", Strings.toString(chainId), "_", Strings.toString(id)
        );
        fieldNames[_tableCount.current()] = fieldName;
        _tableCount.increment();
    }

    // function to return table
    function getTable(uint256 id) public view returns(uint256, string memory, string memory, string memory) {
        return (Tables[id].tableId, Tables[id].tablePrefix, Tables[id].tableName, Tables[id].description);
    }

    // function to write to a table
    function writeTable(uint256 id) public payable {
          string memory writeQuery = concatWriteArray(fieldNames[id]);
          TablelandDeployments.get().mutate(
            address(this),
            Tables[id].tableId,
            SQLHelpers.toInsert(
            Tables[id].tablePrefix,
            Tables[id].tableId,
            writeQuery,
            string.concat(
                Strings.toString(uint256(1)), // Convert to a string
                ",",
                SQLHelpers.quote(Strings.toHexString(msg.sender)) // Wrap strings in single quotes
            )
            )
        );
    }

    function concatCreationArray(string[] memory fields, string[] memory types) public pure returns (string memory) {
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

    function concatWriteArray(string[] memory fields) public pure returns (string memory) {
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
}

