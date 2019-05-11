import {
	createStore,
	applyMiddleware,
	DeepPartial,
} from 'redux';

import {
	createEpicMiddleware,
} from 'redux-observable';

import {
	composeWithDevTools,
} from 'redux-devtools-extension';

import {
	RootAction,
} from '~/actions';

import {
	epics,
} from '~/epics';

import {
	reducers,
	State,
} from '~/reducers';

function configureStore() {
	const epicMiddleware = createEpicMiddleware<RootAction, RootAction, State>();

	const preloadedState: DeepPartial<State> = {
		'account': {
			'loading': false,
			'token': window.localStorage.getItem('token'),
			'valid': false,
		},
	};

	const store = createStore(
		reducers,
		preloadedState,
		composeWithDevTools(applyMiddleware(epicMiddleware)),
	);

	epicMiddleware.run(epics);

	return store;
}

export default configureStore();
