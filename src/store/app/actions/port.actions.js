export const PORT_ACTION = 'PORT_ACTION';

export const portAction = (data = { success: false, message: '', port: '' }) => ({
	type: PORT_ACTION,
	payload: { ...data }
});
