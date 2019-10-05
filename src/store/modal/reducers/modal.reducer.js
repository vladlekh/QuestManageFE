import { SET_START_MODAL_OPENED_ACTION } from "../actions/set-start-modal-opened.action";
import { SET_STOP_MODAL_OPENED_ACTION } from "../actions";

const initialState = {
    startModal: false,
    stopModal: false,
};

export function modalReducer(state = initialState, action) {
    switch (action.type) {
        case SET_START_MODAL_OPENED_ACTION: {
            const { value } = action.payload;
            return {
                ...state,
                startModal: value,
            }
        }
        case SET_STOP_MODAL_OPENED_ACTION: {
            const { value } = action.payload;
            return {
                ...state,
                stopModal: value,
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}
