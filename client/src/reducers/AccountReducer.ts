import {
	getType,
} from 'typesafe-actions';

import {
	invalidateToken,
	fetchToken,
	verifyToken,
	RootAction,
} from '~/actions';

export type AccountState = Readonly<{
	loading: boolean;
	token: string | null;
	valid: boolean;
}>;

const initialState: AccountState = {
	'loading': false,
	'token': null,
	'valid': false,
};

export function accountReducer(state: AccountState = initialState, action: RootAction): AccountState {
	switch (action.type) {
		case getType(invalidateToken): {
			return {
				...initialState,
			};
		}
		case getType(fetchToken.request): {
			return {
				...state,
				'loading': true,
			};
		}
		case getType(fetchToken.success): {
			return {
				...state,
				'loading': false,
				'token': action.payload,
			};
		}
		case getType(fetchToken.failure):
		case getType(fetchToken.cancel): {
			return {
				...state,
				'loading': false,
			};
		}
		case getType(verifyToken.request): {
			return {
				...state,
				'loading': true,
			};
		}
		case getType(verifyToken.success): {
			return {
				...state,
				'loading': false,
				'valid': action.payload,
			};
		}
		case getType(verifyToken.failure):
		case getType(verifyToken.cancel): {
			return {
				...state,
				'loading': false,
				'valid': false,
			};
		}
		default: {
			return state;
		}
	}
}
