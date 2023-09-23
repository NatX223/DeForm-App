export const routerABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "formOwner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "tableName",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "tableContract",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tableId",
				"type": "uint256"
			}
		],
		"name": "addTable",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
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
		"inputs": [],
		"name": "createRouterTable",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "formOwner",
				"type": "address"
			}
		],
		"name": "getContract",
		"outputs": [
			{
				"internalType": "address",
				"name": "contractAddress",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTable",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
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
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Tables",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "tableId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "tablePrefix",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "tableName",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]