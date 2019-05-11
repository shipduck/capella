import React from 'react';

import {
	render,
} from 'react-dom';

import {
	Provider,
} from 'react-redux';

import store from '~/store';

import {
	AppContainer,
} from '~/containers';

const AppRouter: React.FC = () => {
	return (
		<Provider
			store={store}
		>
			<AppContainer />
		</Provider>
	);
}

render(<AppRouter />, document.getElementById('app'));
