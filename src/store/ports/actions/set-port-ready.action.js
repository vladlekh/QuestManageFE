export const SET_PORT_READY_ACTION = 'SET_PORT_READY_ACTION';

export const setPortReadyAction = (path, value) => ({
    type: SET_PORT_READY_ACTION,
    payload: { path, value }
});