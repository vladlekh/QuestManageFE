import {
	INITIALIZE_QUEST_ACTION,
	SET_QUEST_PAUSE_ACTION,
	START_QUEST_ACTION,
	STOP_QUEST_ACTION,
	UPDATE_QUEST_PERSONS_ACTION
} from "../actions";

const initialState = {
	started: false,
	paused: false,
	initialized: false,
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
		case STOP_QUEST_ACTION: {
			return {
				...initialState
			}
		}
		case INITIALIZE_QUEST_ACTION: {
			const { payload } = action;
			return {
				...state,
				initialized: payload.initialized,
			}
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
