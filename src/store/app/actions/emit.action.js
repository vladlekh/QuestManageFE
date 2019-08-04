export const EMIT_ACTION = 'EMIT_ACTION';

export const emitAction = (event, name) => ({
	type: EMIT_ACTION,
	payload: { event, name },
});
