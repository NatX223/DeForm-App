import { ethers } from "ethers";
import { Database, helpers } from "@tableland/sdk";
import { routerABI } from "./RouterABI";
import { formABI } from "./formABI";

require("dotenv").config();

const bytecode = '333mm4m4m4m4m4'; // update bytecode

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

function getInputs(questions, inputTypes) {
    const modifiedQuestions = questions.map((question, i) => {
        const modifiedQuestion = question.replace(/\s/g, '_');
        const inputType = inputTypes[i];
        return `${modifiedQuestion}(${inputType})`;
    });
  
    const modifiedInputTypes = inputTypes.map((inputType) => {
      // Change "file" to "text"
      return inputType === "file" ? "text" : inputType;
    });
  
    return [modifiedQuestions, modifiedInputTypes];
}

const create = async (_questions, _inputTypes, name, details, contractAddress) => { // add the fee and reward feature
    // getContract Address
    const [questions, inputTypes] = getInputs(_questions, _inputTypes);
    // construct contract
    const formContract = new ethers.Contract(contractAddress, formABI, signer);
    // call function to create table
    const tx = await formContract.createTable(name, questions, inputTypes, details)
    const receipt = await tx.wait();
    return(receipt);
}

const deploy = async () => {
    const ContractInstance = new ethers.ContractFactory(formABI, bytecode, signer);
    const contractInstance = await ContractInstance.deploy();
    const contractReturnedString = await contractInstance.getName();
    return contractReturnedString;
}

export const createForm = async (_questions, _inputTypes, name, details) => {
    const routerContract = new ethers.Contract(routerContractAddress, routerABI, signer);
    const userAddress = getUserAddress();
    const contractAddress = await routerContract.getContract(userAddress); // update router contract with functions to set and get contractAddress for users update createTable function in formContract
    if (contractAddress == '0x0000000000000000000000000000000000000000') {
        const newContractAddress = await deploy();
        const receipt = await create(_questions, _inputTypes, name, details, newContractAddress);
        console.log(receipt);
    } else {
        const receipt = await create(_questions, _inputTypes, name, details, contractAddress);
        console.log(receipt);
    }
}

function findTable(array, targetTableName) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].tableName === targetTableName) {
        return array[i];
      }
    }
    // If no matching object is found, return null or handle it as needed
    return null;
}

function getObjectParameters(array) {
if (array.length === 0) {
    return []; // Return an empty array if the input array is empty.
}

// Get the keys (parameters) of the first object in the array.
const keys = Object.keys(array[0]);

// Assuming all objects in the array have the same parameters,
// you can simply return the keys from the first object.
return keys;
}

function splitElements(array) {
    const firstArray = [];
    const secondArray = [];
  
    array.forEach((element) => {
      const matches = element.match(/^(.*?)\((.*?)\)$/);
      if (matches && matches.length === 3) {
        firstArray.push(matches[1]);
        secondArray.push(matches[2]);
      }
    });
  
    return [firstArray, secondArray];
  }

// create function to get a form
// get table contract and id using tableName(get TableName from search params)
// construct contract
// get questions and by types by separating the question from the '(inputType)' get them and concat to arrays then return them
export const getForm = async (tableName) => {
    const { results } = await db.prepare(`SELECT * FROM ${tableName} LIMIT 2;`).all();
    const _form = getObjectParameters(results);
    const form = splitElements(_form);
    console.log(form);
    return form;
}

// create function to get responses from users
// prolly do the concatenation here
const routerContract = new ethers.Contract(routerContractAddress, routerABI, signer);
const routerName = routerContract.getTable();
const { results } = await db.prepare(`SELECT * FROM ${routerName};`).all();
const table = findTable(results, tableName);
const formContract = new ethers.Contract(table.tableContract, formABI, signer);
// create function to upload files and return their IPFS hash
// then concat to response array

