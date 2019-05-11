import React from 'react';

import {
	fetchToken,
	verifyToken,
} from '~/actions';

export interface Props {
	token: string | null;

	fetchToken: typeof fetchToken.request;
	verifyToken: typeof verifyToken.request;
}

export const AccountComponent: React.FC<Props> = (props) => {
	return (
		<div>
			{'account'}
		</div>
	);
};
