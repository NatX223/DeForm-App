// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract DeformMarketPlace { // Inherit from Ownable
    using Counters for Counters.Counter;
    Counters.Counter internal _dataId;

    // enum to indicate the different sectors forms could be in
    // in health, financials, politics, education etc
    enum sector { Health, Financials, Politics, Education, Other }

    // struct for holding NFT details
    struct Details {
        address lister;
        uint256 price;
        bool onSale;
        uint256 sector;
        uint256 tablelandId;
        address listerContract;
    }

    IERC721 Tableland;

    // mapping to hold price of token
    mapping(uint256 => Details) public tokenDetails;

    constructor(address registryAddress) {
        Tableland = IERC721(registryAddress);
    }

    // function to list an already existing dataset
    function listDataset(uint256 price, uint256 _sector, uint256 tablelandId, address lister, address listerContract) public notForSale(_dataId.current()) {
        tokenDetails[_dataId.current()].lister = lister;
        tokenDetails[_dataId.current()].price = price; 
        tokenDetails[_dataId.current()].sector = _sector;
        tokenDetails[_dataId.current()].tablelandId = tablelandId;
        tokenDetails[_dataId.current()].onSale = true;
        tokenDetails[_dataId.current()].listerContract = listerContract;
        _dataId.increment();
    }

    // function to delist a dataset
    function delistDataset(uint256 id) public isForSale(id) {
        tokenDetails[id].onSale = false; // Update onSale value to false
    }

    // function to buy datasets
    function buyDataset(uint256 id) public payable isPrice(id) isForSale(id) {
        Details storage details = tokenDetails[id];
        address lister = details.lister;
        uint256 price = details.price;

        require(lister != address(0), "Token does not exist");
        require(details.onSale, "Token is not for sale");
        require(msg.value == price, "Incorrect amount sent");

        details.onSale = false; // Remove it from being on sale
        payable(lister).transfer(price); // Transfer the amount to the lister
        Tableland.transferFrom(tokenDetails[id].listerContract, msg.sender, tokenDetails[id].tablelandId);
    }

    // modifiers
    modifier notForSale(uint256 tokenID) {
        require(!tokenDetails[tokenID].onSale, "Token is already for sale");
        _;
    }

    modifier isForSale(uint256 tokenID) {
        require(tokenDetails[tokenID].onSale, "Token is not for sale");
        _;
    }

    modifier isPrice(uint256 tokenID) {
        require(msg.value == tokenDetails[tokenID].price, "Incorrect amount sent");
        _;
    }
}