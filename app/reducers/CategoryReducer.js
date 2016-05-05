import {
  RECEIVED_CATEGORY_LIST,
} from '../actions/CategoryActions';
import {
  findObjById,
} from '../utils/immutable';

const defaultState = {
  addList: [],
};

export function category(state = defaultState, action) {
  switch (action.type) {
    case RECEIVED_CATEGORY_LIST: {
      let newList = [...action.data];
      newList.splice(0, 1);
      return {
        ...state,
        addList: newList,
      };
    }
    default:
      return state;
  }
}
