import React from 'react';

import {
	fetchToken,
	verifyToken,
} from '~/actions';

import {
	AccountContainer,
} from '~/containers';

export interface Props {
	token: string | null;

	fetchToken: typeof fetchToken.request;
	verifyToken: typeof verifyToken.request;
}

export const AppComponent: React.FC<Props> = (props) => {
	if (props.token === null) {
		return (
			<AccountContainer />
		);
	}
	return (
		<div>
			{'app'}
		</div>
	);
};
