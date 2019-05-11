import {
	isActionOf,
} from 'typesafe-actions';

import {
	Epic,
} from 'redux-observable';

import {
	from,
	of,
} from 'rxjs';

import {
	filter,
	map,
	switchMap,
	takeUntil,
	catchError,
} from 'rxjs/operators';

import {
	AsyncAction,
	RootAction,
} from '~/actions';

import {
	sendRequest,
} from '~/helpers';

export function generateEpic(asyncAction: AsyncAction) : Epic<RootAction, RootAction> {
	return action$ => {
		return action$.pipe(
			filter(isActionOf(asyncAction.request)),
			switchMap(action =>
				from(sendRequest(action)).pipe(
					map(asyncAction.success),
					catchError(x => of(asyncAction.failure(x))),
					takeUntil(action$.pipe(
						filter(isActionOf(asyncAction.cancel)),
					)),
				),
			),
		);
	};
}
