import {
  RECEIVED_ADDCATEGORY_LIST,
  RECEIVED_CATEGORY_LIST,
  RECEIVED_FILTER_CATEGORY_LIST,
} from '../actions/CategoryActions';

const defaultState = {
  addList: [],
  list: [],
  filterList: [],
};

export function category(state = defaultState, action) {
  switch (action.type) {
    case RECEIVED_ADDCATEGORY_LIST: {
      let newList = [...action.data];
      newList.splice(0, 1);
      return {
        ...state,
        addList: newList,
      };
    }
    case RECEIVED_CATEGORY_LIST: {
      return {
        ...state,
        list: action.data,
      };
    }
    case RECEIVED_FILTER_CATEGORY_LIST: {
      return {
        ...state,
        filterList: action.data,
      };
    }
    default:
      return state;
  }
}
