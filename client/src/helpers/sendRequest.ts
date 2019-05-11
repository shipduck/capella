import qs from 'qs';

import {
	getType,
} from 'typesafe-actions';

import {
	fetchToken,
	verifyToken,
	RequestAction,
	ActionPayload,
} from '~/actions';

interface RequestOption {
	url: string;
	method: 'GET' | 'POST';
}

function getRequestOptions(action: RequestAction): RequestOption {
	switch (action.type) {
		case getType(fetchToken.request): {
			return {
				'url': '',
				'method': 'GET',
			};
		}
		case getType(verifyToken.request): {
			return {
				'url': '',
				'method': 'POST',
			};
		}
	}
}

export async function sendRequest<T extends RequestAction>(action: T) : Promise<ActionPayload<T>> {
	const options = getRequestOptions(action);

	const token = '';

	switch(options.method) {
		case 'GET': {
			const query = qs.stringify(action.payload);

			const response = await fetch(`${options.url}?${query}`, {
				'method': 'GET',
				'headers': {
					'Authorization': `Bearer ${token}`,
				},
			});
			if (response.ok === false) {
				throw new Error(response.statusText);
			}
			return response.json();
		}
		case 'POST': {
			const response = await fetch(options.url, {
				'method': 'POST',
				'headers': {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				'body': JSON.stringify(action.payload),
			});
			if (response.ok === false) {
				throw new Error(response.statusText);
			}
			return response.json();
		}
	}
}
