import { START_QUEST_ACTION, SET_QUEST_PAUSE_ACTION, UPDATE_QUEST_PERSONS_ACTION } from "../actions";

const initialState = {
	started: false,
	paused: false,
	persons: 3,
};

export const statusReducer = (state = initialState, action) => {
	switch (action.type) {
		case START_QUEST_ACTION: {
			return {
				...state,
				started: true,
			};
		}
		case SET_QUEST_PAUSE_ACTION: {
			return {
				...state,
				paused: action.payload.paused,
			}
		}
		case UPDATE_QUEST_PERSONS_ACTION: {
			return {
				...state,
				persons: action.payload.value,
			}
		}
		default: {
			return { ...state };
		}
	}
};
