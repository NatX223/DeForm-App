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

    constructor(uint256 _chainId) {
        owner = msg.sender;
        chainId = _chainId;
    }

    // function to create a table
    function createTable(string memory tablePrefix, string[] memory fieldName, string[] memory fieldType) public {
        require(fieldName.length == fieldType.length && fieldName.length == 5);

        string memory createQuery = string.concat( // concating strings to form a create table query
            fieldName[0], " ", fieldType[0], " ", "primary key",
            fieldName[1], " ", fieldType[1],
            fieldName[2], " ", fieldType[2],
            fieldName[3], " ", fieldType[3],
            fieldName[4], " ", fieldType[4]
            // fieldName[5], " ", fieldType[5],
            // fieldName[6], " ", fieldType[6]
        );
        uint256 id = TablelandDeployments.get().create( // creating a table ID
            address(this), // setting it's owner to the address for easy write access
            SQLHelpers.toCreateFromSchema(
                createQuery,
                tablePrefix // the needed prefix for table
            )
        );
        Tables[_tableCount.current()].tableId = id;
        Tables[_tableCount.current()].tableName = string.concat(
            tablePrefix, "_", Strings.toString(chainId), "_", Strings.toString(id)
        );
    }

    // function to return tableId
    function tableId(uint256 id) public view returns(uint256) {
        return Tables[id].tableId;
    }

    // // function to write to a table
    // function writeTable() public payable {
    //       TablelandDeployments.get().mutate(
    //         address(this),
    //         _tableId,
    //         SQLHelpers.toInsert(
    //         _TABLE_PREFIX,
    //         _tableId,
    //         "id,val",
    //         string.concat(
    //             Strings.toString(uint256(1)), // Convert to a string
    //             ",",
    //             SQLHelpers.quote(Strings.toHexString(msg.sender)) // Wrap strings in single quotes
    //         )
    //         )
    //     );
    // }

    // creating a table factory
    // mapping tableIDs and tableNames to uints probably counters
}

