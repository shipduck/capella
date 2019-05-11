import {
	bindActionCreators,
	Dispatch,
} from 'redux';

import {
	connect,
} from 'react-redux';

import {
	fetchToken,
	verifyToken,
} from '~/actions';

import {
	State,
} from '~/reducers';

import {
	AccountComponent,
} from './AccountComponent';

function mapStateToProps(state: State) {
	return {
		'token': state.account.token,
	};
}

function mapDispatchToProps(dispatch: Dispatch) {
	return bindActionCreators({
		'fetchToken': fetchToken.request,
		'verifyToken': verifyToken.request,
	}, dispatch);
}

export const AccountContainer = connect(mapStateToProps, mapDispatchToProps)(AccountComponent);
