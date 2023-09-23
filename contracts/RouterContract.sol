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

    // mapping of contract address to form creator
    mapping (address => address) contractOwners;

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
                "tableName text,"
                "tableContract text,"
                "tableId integer",
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
    function getTable() public view returns(string memory) {
        return (Tables[1].tableName);
    }

    // function to write to a table
    function addTable(address formOwner, string memory tableName, address tableContract, uint256 tableId) public {
          setContract(formOwner, tableContract);
          TablelandDeployments.get().mutate(
            address(this),
            Tables[1].tableId,
            SQLHelpers.toInsert(
            Tables[1].tablePrefix,
            Tables[1].tableId,
            "id,tableName,tableContract,tableId",
            string.concat(
                Strings.toString(uint256(_RouterTableCountId.current())),
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

    function setContract(address formOwner, address contractAddress) internal {
        contractOwners[formOwner] = contractAddress;
    }

    function getContract(address formOwner) public view returns(address contractAddress) {
        contractAddress = contractOwners[formOwner];
    }
    
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
}