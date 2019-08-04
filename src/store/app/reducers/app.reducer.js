import { GET_STRUCTURE_ACTION, GET_STRUCTURE_SUCCESSFUL_ACTION } from "../actions";

const initialState = {
	loading: false,
	config: {},
};

export const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_STRUCTURE_ACTION:
			return {
				...state,
				loading: true
			};
		case GET_STRUCTURE_SUCCESSFUL_ACTION: {
			return {
				...state,
				loading: false,
				config: action.payload,
			}
		}
		default:
			return state;
	}
};
