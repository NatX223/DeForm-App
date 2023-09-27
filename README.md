# DeForm-App
decentralized form application
# Description of the project
DeForm app is a decentralized form creation platform ained getting more value out of forms
This can be accomplished by
1. Imposing fees for users who fill the forms
2. giving out rewards/NFTs for filling forms
3. Curating form respponses and selling them off as datasets
# Getting started
Your README should provide clear instructions for users on how to set up Node.js, npm (Node Package Manager), and Next.js to run your project on their local devices. Here's an example of how you can structure this section:

### Getting Started

To run this project locally on your computer, you will need to have Node.js and npm installed. If you haven't already, follow these steps to set up your development environment:

1. **Install Node.js:** If you don't have Node.js installed, download and install it from the official website: [Node.js Downloads](https://nodejs.org/en/download/)

   To check if you have Node.js installed, open your terminal and run:
   node -v
   You should see the installed Node.js version. Make sure it's at least version 14 or later.

2. **Install npm:** npm (Node Package Manager) is usually included with Node.js. To check if you have npm installed, run:
   npm -v
   This will display the installed npm version.
3. **Install Next.js:**
   Next.js is a JavaScript framework built on top of Node.js, and it simplifies the process of building React applications. You can install it globally using npm:
   npm install -g next
   This command installs Next.js globally on your system.
### Installing Project Dependencies
Now that you have Node.js, npm, and Next.js installed, you can set up this project by following these steps:
1. **Clone the Repository:** First, clone this project's repository to your local machine using Git. Open your terminal and run:
   git clone https://github.com/yourusername/yourproject.git
   Replace `yourusername` and `yourproject` with the actual GitHub username and project name.
2. Navigate to the Project Directory: Change your current directory to the project directory:
   cd yourproject
3. **Install Project Dependencies:** Use npm to install the required project dependencies:
   npm install
   This command will read the `package.json` file and install all the necessary packages.
# Running the Project Locally
Once you have installed the project dependencies, you can start the development server locally:
npm run dev
This command will start the Next.js development server, and you should see output similar to the following:
Ready on http://localhost:3000
Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to access the locally running project.
That's it! You now have Node.js, npm, and Next.js set up, and you can run the project on your local machine for development and testing.
Remember to customize these instructions based on the specific details of your project, including any additional setup steps or configuration that might be required.

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
