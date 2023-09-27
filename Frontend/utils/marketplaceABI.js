export const marketABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "registryAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "buyDataset",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "delistDataset",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getDataset",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
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
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tablelandId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "lister",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "listerContract",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "responseCount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "tableName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "tableDescription",
				"type": "string"
			}
		],
		"name": "listDataset",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tokenDetails",
		"outputs": [
			{
				"internalType": "address",
				"name": "lister",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "onSale",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "tablelandId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "listerContract",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "responseCount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "tableName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "tableDescription",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]