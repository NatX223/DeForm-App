// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract DeformMarketPlace is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenID;

    // enum to indicate the different sectors forms could be in
    // in health, financials, politics, education etc
    // enum sector { }

    // struct for holding NFT details
    struct Details {
        address lister;
        uint256 price;
        bool onSale; // you can rename this to whatever you like but it should indicate if the NFT is still up for sale or not
        uint256 sector;
        string ipfsHash; // you could rename this, but should indicate the IPFS hash of the data set
    }

    // mapping to hold price of token
    mapping (uint256 => Details) public tokenDetails;

    constructor (string memory name_, string memory symbol_) ERC721(name_, symbol_) {

    }

    // function to list a dataset as NFT
    function createDataset(uint256 price, uint256 sector, string memory IPFSHash) public {
        // set the details of the listing
        // use _tokenID.current() as the token ID and mint the NFT to smart contract
        // increment the counter _tokenID.increment()
    }

    // function to list an already existing dataset
    function listDataset(uint256 tokenID, uint256 price) public onlyOwner notForSale(tokenID) {
        // update the needed params
        // call transferFrom function to transfer the token to the smart contract
    }

    // function to delist a dataset
    function delistDataset(uint256 tokenID) public onlyOwner isForSale(tokenID) {
        // update onSale value
    }

    // function to buy datasets
    function buyDataset(uint256 tokenID) public payable isPrice(tokenID) {
        // transfer amount to the lister
        // transfer ownership to the new owner
        // remove it from being on sale
    }

    // modifiers
    modifier notForSale(uint256 tokenID) {
        // require that onSale value == false
        _;
    }

    modifier isForSale(uint256 tokenID) {
        // require that onSale value == true
        _;
    }

    modifier isPrice(uint256 tokenID) {
        // require that msg.value == dataset price
        _;
    }

}