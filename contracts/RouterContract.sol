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
    struct form {
        uint256 tableId;
        address formContract;
        address formOwner;
    }

    // mapping table counters to tables
    mapping (string => form) forms;
    // mapping form owners to their contracts
    mapping (address => address) owners;

    constructor() {
        owner = msg.sender;
    }

    // function to write to a table
    function addTable(address formOwner, string memory tablePrefix, address tableContract, uint256 tableId) public {
        forms[tablePrefix] = form(tableId, tableContract, formOwner);
        owners[formOwner] = tableContract;
    }

    function getTable(string memory prefix) public view returns(uint256, address, address) {
        return(forms[prefix].tableId, forms[prefix].formContract, forms[prefix].formOwner);
    }
    
    function getContract(address formOwner) public view returns(address contractAdd) {
        return(owners[formOwner]);
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
}