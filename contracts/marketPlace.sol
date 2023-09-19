// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol"; // Import Ownable contract

contract DeformMarketPlace is ERC721, Ownable { // Inherit from Ownable
    using Counters for Counters.Counter;
    Counters.Counter private _tokenID;

    // enum to indicate the different sectors forms could be in
    // in health, financials, politics, education etc
    enum sector { Health, Financials, Politics, Education, Other }

    // struct for holding NFT details
    struct Details {
        address lister;
        uint256 price;
        bool onSale; // you can rename this to whatever you like but it should indicate if the NFT is still up for sale or not
        uint256 sector;
        string ipfsHash; // you could rename this, but should indicate the IPFS hash of the data set
    }

    // mapping to hold price of token
    mapping(uint256 => Details) public tokenDetails;

    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) {}

    // function to list a dataset as NFT
    function createDataset(uint256 price, uint256 sector, string memory IPFSHash) public {
        uint256 tokenId = _tokenID.current(); // Get the current token ID
        _mint(msg.sender, tokenId); // Mint the NFT to the sender
        tokenDetails[tokenId] = Details({
            lister: msg.sender,
            price: price,
            onSale: true,
            sector: sector,
            ipfsHash: IPFSHash
        });
        _tokenID.increment(); // Increment the token ID counter
    }

    // function to list an already existing dataset
    function listDataset(uint256 tokenID, uint256 price) public onlyOwner notForSale(tokenID) {
        tokenDetails[tokenID].price = price; // Update the price
        tokenDetails[tokenID].onSale = true; // Set it as on sale
        transferFrom(ownerOf(tokenID), address(this), tokenID); // Transfer the token to the contract
    }

    // function to delist a dataset
    function delistDataset(uint256 tokenID) public onlyOwner isForSale(tokenID) {
        tokenDetails[tokenID].onSale = false; // Update onSale value to false
    }

    // function to buy datasets
    function buyDataset(uint256 tokenID) public payable isPrice(tokenID) {
        Details storage details = tokenDetails[tokenID];
        address lister = details.lister;
        uint256 price = details.price;

        require(lister != address(0), "Token does not exist");
        require(details.onSale, "Token is not for sale");
        require(msg.value == price, "Incorrect amount sent");

        details.onSale = false; // Remove it from being on sale
        transferFrom(address(this), msg.sender, tokenID); // Transfer ownership to the new owner
        payable(lister).transfer(price); // Transfer the amount to the lister
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