import { SET_ACTIVE_AUDIO_ACTION, SET_AUDIO_LIST_ACTION } from '../actions';

const initialState = {
  list: [],
};

export const audioReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUDIO_LIST_ACTION: {
      const { list: sourceList } = action.payload;
      const list = sourceList.map(item => ({ ...item, isActive: false }));
      return {
        ...state,
        list,
      };
    }
    case SET_ACTIVE_AUDIO_ACTION: {
      const { name, isActive } = action.payload;
      const list = state.list.reduce((acc, val) => {
        return val.name === name ? [...acc, { ...val, isActive }] : [...acc, val];
      }, []);
      return {
        ...state,
        list,
      };
    }
    default: {
      return state;
    }
  }
};
