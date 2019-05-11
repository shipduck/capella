import {
	combineEpics,
} from 'redux-observable';

import accountEpics from './AccountEpic';

export const epics = combineEpics(
	...accountEpics,
);
