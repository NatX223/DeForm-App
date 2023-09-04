import { Database } from "@tableland/sdk";
import { Wallet, ethers } from "ethers";
import { PRIVATE_KEY } from "../credentials.mjs";

const contractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "chainid",
          "type": "uint256"
        }
      ],
      "name": "ChainNotSupported",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "tablePrefix",
          "type": "string"
        },
        {
          "internalType": "string[]",
          "name": "fieldName",
          "type": "string[]"
        },
        {
          "internalType": "string[]",
          "name": "fieldType",
          "type": "string[]"
        }
      ],
      "name": "createTable",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "",
          "type": "bytes"
        }
      ],
      "name": "onERC721Received",
      "outputs": [
        {
          "internalType": "bytes4",
          "name": "",
          "type": "bytes4"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

const contractAddress = "";

const wallet = new Wallet(PRIVATE_KEY);

const provider = new ethers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/x66ngpknfweaoFrjMzdrIio3F3-YqUDV");
const signer = wallet.connect(provider);

const contract = new ethers.Contract(contractAddress, contractABI, signer)

// Connect to the database
const db = new Database();

const createTable = async () => {
  await contract.createTable();
  console.log("created");
}

const getTableId = async () => {
  const tableId = await contract.tableId();
  console.log(tableId);
}

const makeWrite = async () => {
  await contract.writeTable();
}

const makeRead = async () => {
  const tableName = "first_table_80001_7187"
  const { results } = await db.prepare(`SELECT * FROM ${tableName};`).all();
  console.log(results);
}

// const create = createTable();
// create;

// const get = getTableId();
// get;

// const write = makeWrite();
// write;

const read = makeRead();
read;