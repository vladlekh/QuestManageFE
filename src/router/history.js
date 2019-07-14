import { createHashHistory } from 'history';
import qs from 'qs';

const history = createHashHistory();

export const routerHistory = history;

export const getHistoryLocation = () => {
	const { pathname, search } = history.location;
	const params = qs.parse(search, { ignoreQueryPrefix: true });
	return {
		pathname,
		params,
	};
};
