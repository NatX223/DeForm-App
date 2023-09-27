# README.md
![Alt text](https://github.com/NatX223/DeForm-App/blob/main/Screenshot%202023-09-27%20at%2023.44.18.jpeg)
# DeForm-App

  

## Project Description

DeForm is a revolutionary platform designed to address several critical challenges related to data collection, sharing, and incentives through interactive forms. In today's data-driven world, the value of data cannot be overstated, and DeForm aims to empower individuals and organizations by providing a solution that not only collects data efficiently but also ensures that data contributors are rewarded for their participation.

## Deployed App


Public URL: 


Contract is deployed on Polygon Mumbai Testnet

### Smart Contract Layer

The smart contract layer consists of four interconnected contracts: DeformMarketPlace (Layer 1), userTables (Layer 2), controller (Layer 3), and Router (Layer 4). These contracts collectively enable the management and trading of datasets as NFTs. Here's an overview of their roles and interactions:

DeformMarketPlace (Layer 1):

Manages the dataset marketplace for NFTs.
Allows users to list, purchase, and delist datasets.
Interfaces with the ERC721 token contract (Tableland) to transfer NFTs.
Defines dataset details using a struct and sectors using enums.
Implements modifiers to ensure dataset availability and correct pricing.

userTables (Layer 2):

Facilitates the creation and management of tables (forms or data structures).
Inherits from ERC721Holder and ERC1155.
Users can create tables, write data, and list tables on the marketplace.
Interacts with a router contract and a marketplace contract.
Provides features such as access control policies, rewards for form filling, and controller updates.

controller (Layer 3):

Functions as a data access controller.
Defines policies for access control (insert, update, delete) based on the caller's address.
Allows setting fees for writing to the contract.
Enables customization of access control policies.
Implements the TablelandController interface and returns access policies.

Router (Layer 4):

Serves as a router to associate form owners with their respective table contracts.
Users can add tables to the router to link form owners and table contracts.
Provides functions for retrieving table information and associated contracts.
Utilizes the OpenZeppelin Counters library for managing table IDs.

Together, these contracts create a multi-layered system for efficiently managing and trading datasets as NFTs. Users can create tables, write data, list tables for sale, and purchase datasets on the marketplace. Access control is enforced through controllers and customizable policies. This layer leverages OpenZeppelin Contracts for the creation of ERC-721 tokens from metadata, allowing datasets to be represented as NFTs.



  





## Project structure
deform-app
```
├── contracts
│   ├── DeForm.sol     	
│   ├── OtherContracts.sol 

│   └── ...
│
├── scripts
│   ├── deploy_DeForm.js   

│   ├── deploy_Other.js	

│   └── ...
│
├── tests
│   ├── DeForm.test.js 	
│   ├── OtherTests.js  	
│   └── ...
│
├── assets             	
│   ├── nft_image.png
│   ├── ...
```
#### Frontend:   
```
│   ├── node_modules   	
│   ├── package-lock.json  
│   ├── package.json   	
│   ├── postcss.config.js  
│   ├── public         	
│   ├── src            	
│   │   ├── components 	
│   │   ├── pages      	
│   │   ├── styles     
│   │   ├── ...
│   ├── tailwind.config.js 
│   └── tsconfig.json  	
│
├── hardhat.config.js   	
│
├── node_modules        	
│
├── package-lock.json   	
│
├── package.json        	

```



## Local Setup
Project was built and tested against:
* Node v19.7.0
* Npm v9.5.0

* **Ensure dotenv is setup with team 4 keys/signers** 

#### Smart Contracts
1. From the repo root run ``npm install``
2. Once install is complete:
	 * To **compile** the contract(s) run: 
	 ``npx hardhat compile``
	 * To **test** the contract(s) run: 
	 ``npx hardhat --network hardhat test``
	 * To **run** contracts run: 
	 ``npx hardhat --network hardhat run scripts/deployHashHive.js``

	
#### **Frontend:**
 - Cd to the **frontend** directory.
 - Run ``npm install``
 - Once install is complete:
	 * To start, run: 
	 ``npm run start``
- App will be accessible via http://localhost:3000/


### Sponsor Technologies
1. Tableland
Tableland was used for the smoth and dynamic creation of tables to hold form responses, the code below highlists the
use of Table for table creation
    function createTable(string memory tablePrefix, string memory createString, string memory description, string memory writeQuery) public onlyOwner {

        uint256 id = TablelandDeployments.get().create( // creating a table ID
            address(this), // setting it's owner to the address for easy write access
            SQLHelpers.toCreateFromSchema(
                string.concat("id integer primary key,", createString),
                tablePrefix // the needed prefix for table
            )
        );

        string memory tableName = string.concat(
            tablePrefix, "_", Strings.toString(block.chainid), "_", Strings.toString(id)
        );
        
        TablelandDeployments.get().setController(address(this), id, controllerContract);
        
        writeQueries[_tableCount.current()] = writeQuery;
        
        routerContract.addTable(msg.sender, tablePrefix, address(this), _tableCount.current());
        _tableCount.increment();
    }
It was done inside smart contracts enabling for a lot of usecases like applying access control for a respondent to own an NFT before he can write to a form
example of access control is given below
    function getPolicy(address caller, uint256) public payable override returns(TablelandPolicy memory) {
        require(msg.value == fee, "pay fee to insert");

2. Web3.Storage
forms can also take in file inputs and this was enabled using web3.storage for storing files on IPFS and returning the CID to be stored on Tableland
# Demo link
https://youtu.be/Gd-BC4e6sxY
# Pitch deck
https://docs.google.com/presentation/d/1u07HIe-nOf5sN3rN5ZQrZEIQvb2s0xe0pIlyCDlIC9I/edit#slide=id.g4dfce81f19_0_45
