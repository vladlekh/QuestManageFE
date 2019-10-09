export const SET_PORT_CONNECTED_ACTION = 'SET_PORT_CONNECTED_ACTION';

export const setPortConnectedAction = (port, value) => ({
	type: SET_PORT_CONNECTED_ACTION,
	payload: { path: port, value }
});
