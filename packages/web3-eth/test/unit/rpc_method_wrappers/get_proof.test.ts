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
import { Web3Context } from 'web3-core';
import { DEFAULT_RETURN_FORMAT, ETH_DATA_FORMAT, FMT_BYTES, FMT_NUMBER, format } from 'web3-utils';
import { isNullish } from 'web3-validator';
import { Web3EthExecutionAPI } from 'web3-types';
import { ethRpcMethods } from 'web3-rpc-methods';

import { accountSchema } from 'web3-eth-tx-utils';
import { getProof } from '../../../src/rpc_method_wrappers';
import { mockRpcResponse, testData } from './fixtures/get_proof';

jest.mock('web3-rpc-methods');

describe('getProof', () => {
	let web3Context: Web3Context<Web3EthExecutionAPI>;

	beforeAll(() => {
		web3Context = new Web3Context('http://127.0.0.1:8545');
	});

	it.each(testData)(
		`should call rpcMethods.getProof with expected parameters\nTitle: %s\nInput parameters: %s\n`,
		async (_, inputParameters) => {
			const [inputAddress, inputStorageKey, inputBlockNumber] = inputParameters;
			const inputStorageKeyFormatted = inputStorageKey.map(s =>
				format({ eth: 'bytes' }, s, ETH_DATA_FORMAT),
			);

			let inputBlockNumberFormatted;

			if (isNullish(inputBlockNumber)) {
				inputBlockNumberFormatted = web3Context.defaultBlock;
			} else {
				inputBlockNumberFormatted = format(
					{ eth: 'uint' },
					inputBlockNumber,
					ETH_DATA_FORMAT,
				);
			}

			await getProof(web3Context, ...inputParameters, DEFAULT_RETURN_FORMAT);
			expect(ethRpcMethods.getProof).toHaveBeenCalledWith(
				web3Context.requestManager,
				inputAddress,
				inputStorageKeyFormatted,
				inputBlockNumberFormatted,
			);
		},
	);

	it.each(testData)(
		`should format mockRpcResponse using provided return format\nTitle: %s\nInput parameters: %s\n`,
		async (_, inputParameters) => {
			const expectedReturnFormat = { number: FMT_NUMBER.STR, bytes: FMT_BYTES.BUFFER };
			const expectedFormattedResult = format(
				accountSchema,
				mockRpcResponse,
				expectedReturnFormat,
			);
			(ethRpcMethods.getProof as jest.Mock).mockResolvedValueOnce(mockRpcResponse);

			const result = await getProof(web3Context, ...inputParameters, expectedReturnFormat);
			expect(result).toStrictEqual(expectedFormattedResult);
		},
	);
});
