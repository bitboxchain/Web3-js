/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
export const accessListItemSchema = {
	type: 'object',
	properties: {
		address: {
			eth: 'address',
		},
		storageKeys: {
			type: 'array',
			items: {
				eth: 'bytes32',
			},
		},
	},
};

export const accessListSchema = {
	type: 'array',
	items: {
		...accessListItemSchema,
	},
};

export const chainSchema = {
	type: 'string',
	enum: ['goerli', 'kovan', 'mainnet', 'rinkeby', 'ropsten', 'sepolia'],
};

export const hardforkSchema = {
	type: 'string',
	enum: [
		'arrowGlacier',
		'berlin',
		'byzantium',
		'chainstart',
		'constantinople',
		'dao',
		'homestead',
		'istanbul',
		'london',
		'merge',
		'muirGlacier',
		'petersburg',
		'shanghai',
		'spuriousDragon',
		'tangerineWhistle',
	],
};

export const customChainSchema = {
	type: 'object',
	properties: {
		name: {
			eth: 'string',
		},
		networkId: {
			eth: 'uint',
		},
		chainId: {
			eth: 'uint',
		},
	},
};

export const transactionSchema = {
	type: 'object',
	properties: {
		from: {
			eth: 'address',
		},
		to: {
			eth: 'address',
		},
		value: {
			eth: 'uint',
		},
		gas: {
			eth: 'uint',
		},
		gasPrice: {
			eth: 'uint',
		},
		effectiveGasPrice: {
			eth: 'uint',
		},
		type: {
			eth: 'uint',
		},
		maxFeePerGas: {
			eth: 'uint',
		},
		maxPriorityFeePerGas: {
			eth: 'uint',
		},
		accessList: {
			...accessListSchema,
		},
		data: {
			eth: 'bytes',
		},
		input: {
			eth: 'bytes',
		},
		nonce: {
			eth: 'uint',
		},
		chain: { ...chainSchema },
		hardfork: { ...hardforkSchema },
		chainId: {
			eth: 'uint',
		},
		networkId: {
			eth: 'uint',
		},
		common: {
			type: 'object',
			properties: {
				customChain: { ...customChainSchema },
				baseChain: {
					...chainSchema,
				},
				hardfork: {
					...hardforkSchema,
				},
			},
		},
		gasLimit: {
			eth: 'uint',
		},
		v: {
			eth: 'uint',
		},
		r: {
			eth: 'bytes',
		},
		s: {
			eth: 'bytes',
		},
	},
};