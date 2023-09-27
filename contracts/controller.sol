// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "@tableland/evm/contracts/utils/SQLHelpers.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@tableland/evm/contracts/TablelandController.sol";
import "@tableland/evm/contracts/TablelandPolicy.sol";
import "@tableland/evm/contracts/policies/Policies.sol";

contract controller is TablelandController {
    
    uint256 public fee;
    address public owner;
    struct Policy {
        bool allowInsert;
        bool allowUpdate;
        bool allowDelete;
        string whereClause;
        string withCheck;
        string updatableColumn;
    }

    mapping (address => Policy) policies;

    constructor() {
       owner = msg.sender;
    }

    // fee to write to a contract
    function getPolicy(address caller, uint256) public payable override returns(TablelandPolicy memory) {
        require(msg.value == fee, "pay fee to insert");
        if (caller == owner) {
            return TablelandPolicy({
                allowInsert: true,
                allowUpdate: true,
                allowDelete: true,
                whereClause: "",
                withCheck: "",
                updatableColumns: new string[](0)
            });
        } else {
        return TablelandPolicy({
            allowInsert: true,
            allowUpdate: true,
            allowDelete: true,
            whereClause: "",
            withCheck: "",
            updatableColumns: new string[](0)
        });
        }
    }

    // function to set fee
    function setFee(uint256 _fee) public onlyOwner {
        fee = _fee;
    }

    // setPolicy
    function setPolicy(address caller, Policy memory _policy) public onlyOwner {
        policies[caller] = _policy;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
}
