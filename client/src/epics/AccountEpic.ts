import {
	fetchToken,
	verifyToken,
} from '~/actions';

import {
	generateEpic,
} from '~/helpers';

export default [
	generateEpic(fetchToken),
	generateEpic(verifyToken),
];
