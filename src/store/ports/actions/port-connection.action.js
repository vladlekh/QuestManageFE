export const PORT_CONNECTION_ACTION = 'PORT_CONNECTION_ACTION';

export const portConnectionAction = (data = { success: false, message: '', port: '' }) => ({
	type: PORT_CONNECTION_ACTION,
	payload: { ...data }
});
