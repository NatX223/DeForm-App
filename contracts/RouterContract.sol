// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import "@tableland/evm/contracts/utils/SQLHelpers.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Router is ERC721Holder {
    using Counters for Counters.Counter; // OpenZepplin Counter
    Counters.Counter private _RouterTableCountId; // Counter For Proposals

    address public owner;

    // table struct
    struct Table {
        uint256 tableId;
        string tablePrefix;
        string tableName;
    }

    // mapping table counters to tables
    mapping (uint256 => Table) public Tables;

    constructor() {
        owner = msg.sender;
        createRouterTable();
    }

    // function to create a table
    function createRouterTable() public onlyOwner {
        uint256 id = TablelandDeployments.get().create( // creating a table ID
            address(this), // setting it's owner to the address for easy write access
            SQLHelpers.toCreateFromSchema(
                "id integer primary key,"
                "tableName,"
                "tableContract,"
                "tableId",
                "RouterTable"
            )
        );

        Tables[1].tablePrefix = "RouterTable";
        Tables[1].tableId = id;
        Tables[1].tableName = string.concat(
            "RouterTable", "_", Strings.toString(block.chainid), "_", Strings.toString(id)
        );
    }

    // function to return table
    function getTable() public view returns(uint256, string memory, string memory) {
        return (Tables[1].tableId, Tables[1].tablePrefix, Tables[1].tableName);
    }

    // function to write to a table
    // implement function to check if an answer is correct
    function addTable(string memory tableName, address tableContract, uint tableId) public {
          TablelandDeployments.get().mutate(
            address(this),
            Tables[1].tableId,
            SQLHelpers.toInsert(
            Tables[1].tablePrefix,
            Tables[1].tableId,
            "tableName,tableContract,tableId",
            string.concat(
                Strings.toString(uint256(_RouterTableCountId.current())), // Convert to a string
                ",",
                SQLHelpers.quote(tableName),
                ",",
                SQLHelpers.quote(Strings.toHexString(tableContract)),
                ",",
                Strings.toString(uint256(tableId))
            )
            )
        );
        _RouterTableCountId.increment();
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
}