import {
	createStandardAction,
	createAsyncAction,
} from 'typesafe-actions';

export const invalidateToken = createStandardAction(
	'INVALIDATE_TOKEN',
)();

export const fetchToken = createAsyncAction(
	'FETCH_TOKEN_REQUEST',
	'FETCH_TOKEN_SUCCESS',
	'FETCH_TOKEN_FAILURE',
	'FETCH_TOKEN_CANCEL',
)<void, string, Error, void>();

export const verifyToken = createAsyncAction(
	'VERIFY_TOKEN_REQUEST',
	'VERIFY_TOKEN_SUCCESS',
	'VERIFY_TOKEN_FAILURE',
	'VERIFY_TOKEN_CANCEL',
)<void, boolean, Error, void>();
