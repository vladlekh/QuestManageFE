import { PUT_LOG_ACTION } from '../actions';

const initialState = {
  logs: []
};

export const loggerReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT_LOG_ACTION: {
      const { message, port} = action.payload;
      return {
        ...state,
        logs: [
          ...state.logs,
          { message, port }
        ]
      }
    }
    default:
      return state;
  }
};
