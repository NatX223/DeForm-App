import { ethers } from "ethers";
import { Database, helpers } from "@tableland/sdk";
import { routerABI } from "./RouterABI";
import { formABI } from "./formABI";

require("dotenv").config();

// Connect to the database
const db = new Database();

var provider;
var signer;

const routerContractAddress = "0x";

export const connectWallet = async () => {
    provider = new ethers.BrowserProvider(window.ethereum);
  
    await provider.send("eth_requestAccounts", []);
  
    signer = await provider.getSigner();
  
    console.log(signer);
}

export const getUserAddress = async () => {
    address = await signer.address;
    return address;
}

const create = async (questions, inputTypes, name, details) => { // add the fee and reward feature
    // getContract Address
    const routerContract = new ethers.Contract(routerContractAddress, routerABI, signer);
    const userAddress = getUserAddress();
    const inputs = await getInputs(questions, inputTypes);
    // const contractAddress = // run query to get contract address of signer(userAddress)
    // construct contract
    const formContract = new ethers.Contract(contractAddress, formABI, signer);
    // call function to create table
    const tx = await formContract.createTable(name, inputs.questions, inputs.inputTypes, details)
    const receipt = await tx.wait();
    console.log(receipt);
}

//execte function to concat '(file)' to the question if inputType = file, then replace the file with text, do for all tables
const getInputs = async (questions, inputTypes) => {
    const _questions = "4";
    const _inputTypes = "4";
    return {questions: _questions, inputTypes: _inputTypes}
}

// create function to deploy contract and return the address
// const deployContract()

// create function to check if an address exists(check router contract if user has contract)
// if it does not, deploy then call create function
// const createForm() and export

// create function to get a form
// get table contract and id using tableName(get TableName from search params)
// const routerTableName = await routerContract.tableName();
// get questions and by types by separating the question from the '(inputType)' get them and concat to arrays then return them

// create function to get responses from users
// prolly do the concatenation here

// create function to upload files and return their IPFS hash
// then concat to response array