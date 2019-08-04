export const GET_STRUCTURE_SUCCESSFUL_ACTION = 'GET_STRUCTURE_SUCCESSFUL_ACTION';

export const getStructureSuccessfulAction = (structure) => ({
	type: GET_STRUCTURE_SUCCESSFUL_ACTION,
	payload: structure,
});
