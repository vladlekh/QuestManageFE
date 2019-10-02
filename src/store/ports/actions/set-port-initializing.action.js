export const SET_PORT_INITIALIZING_ACTION = 'SET_PORT_INITIALIZING_ACTION';

export const setPortInitializingAction = (initializing) => ({
	type: SET_PORT_INITIALIZING_ACTION,
	payload: { initializing }
});
