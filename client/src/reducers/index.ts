import {
	combineReducers,
} from 'redux';

import {
	accountReducer,
	AccountState,
} from './AccountReducer';

export interface State {
	account: AccountState;
}

export const reducers = combineReducers<State>({
	'account': accountReducer,
});
