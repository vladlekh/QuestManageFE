export const PORT_READY_ACTION = 'PORT_READY_ACTION';

export const portReadyAction = (path) => ({
    type: PORT_READY_ACTION,
    payload: { path },
});
