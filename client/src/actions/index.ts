import {
	ActionType,
	PayloadAC,
	EmptyAC,
} from 'typesafe-actions';

import * as actions from './root';

export * from './root';

export type RootAction = ActionType<typeof actions>;

type Properties<T extends any> = {
	[K in keyof T]: T[K];
}[keyof T];

type Action<T extends ActionType<AsyncAction[keyof AsyncAction]>> = Extract<AsyncAction, {
	[K in keyof AsyncAction]: T extends ActionType<AsyncAction[K]> ? PayloadAC<T['type'], T['payload']> : any;
}>;

export type AsyncAction = {
	request: PayloadAC<any, any>;
	success: PayloadAC<any, any>;
	failure: PayloadAC<any, any>;
	cancel: PayloadAC<any, any>;
};
export type RequestAction = ActionType<Exclude<Properties<typeof actions>, EmptyAC<any>>['request']>;
export type ActionPayload<T extends RequestAction> = ActionType<Action<T>['success']>['payload'];
