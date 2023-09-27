export const controllerABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "fee",
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
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "getPolicy",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bool",
						"name": "allowInsert",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "allowUpdate",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "allowDelete",
						"type": "bool"
					},
					{
						"internalType": "string",
						"name": "whereClause",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "withCheck",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "updatableColumns",
						"type": "string[]"
					}
				],
				"internalType": "struct TablelandPolicy",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "caller",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "getPolicy",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bool",
						"name": "allowInsert",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "allowUpdate",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "allowDelete",
						"type": "bool"
					},
					{
						"internalType": "string",
						"name": "whereClause",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "withCheck",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "updatableColumns",
						"type": "string[]"
					}
				],
				"internalType": "struct TablelandPolicy",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "payable",
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
				"name": "_fee",
				"type": "uint256"
			}
		],
		"name": "setFee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "caller",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "bool",
						"name": "allowInsert",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "allowUpdate",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "allowDelete",
						"type": "bool"
					},
					{
						"internalType": "string",
						"name": "whereClause",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "withCheck",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "updatableColumn",
						"type": "string"
					}
				],
				"internalType": "struct controller.Policy",
				"name": "_policy",
				"type": "tuple"
			}
		],
		"name": "setPolicy",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]