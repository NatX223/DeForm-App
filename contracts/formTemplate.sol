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

    // table struct
    struct Table {
        uint256 tableId;
        string tablePrefix;
        string tableName;
        string description;
    }

    // mapping table counters to tables
    mapping (uint256 => Table) Tables;

    constructor() {
        owner = msg.sender;
    }

    // function to create a table
    function createTable(string memory tablePrefix, string[] memory fieldName, string[] memory fieldType) public {
        require(fieldName.length == fieldType.length && fieldName.length == 7);
        Tables[_tableCount.current()].tablePrefix = tablePrefix;
        Tables[_tableCount.current()].tableId = TablelandDeployments.get().create( // creating a table ID
            address(this), // setting it's owner to the address for easy write access
            SQLHelpers.toCreateFromSchema(
                // concating strings to form 
                "id integer primary key," // Notice the trailing comma // the primary key of the table
                "val text", // Separate lines for readability—but it's a single string // value to be added
                tablePrefix // the needed prefix for table (I guess a ttable name)
            )
        );
        // find a way to handle tableName
    }

    // function to write to a table
    function writeTable() public payable {
          TablelandDeployments.get().mutate(
            address(this),
            _tableId,
            SQLHelpers.toInsert(
            _TABLE_PREFIX,
            _tableId,
            "id,val",
            string.concat(
                Strings.toString(uint256(1)), // Convert to a string
                ",",
                SQLHelpers.quote(Strings.toHexString(msg.sender)) // Wrap strings in single quotes
            )
            )
        );
    }

    // creating a table factory
    // mapping tableIDs and tableNames to uints probably counters
}

