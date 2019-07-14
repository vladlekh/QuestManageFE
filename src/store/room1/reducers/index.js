import { BOX_IS_OPENED_ACTION, TOGGLE_BOX_ACTION } from "../actions";
import { COFFIN_IS_OPENED_ACTION } from "../actions/coffin-is-opened";

const initialState = {
	box: false,
	coffin: false
};

export const room1Reducer = (state = initialState, action) => {
	switch (action.type) {
		case BOX_IS_OPENED_ACTION:
			return {
				...state,
				box: true,
			};
		case COFFIN_IS_OPENED_ACTION:
			return {
				...state,
				coffin: true,
			};
		default:
			return state;
	}
};
