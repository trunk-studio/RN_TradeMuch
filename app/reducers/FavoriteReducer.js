import {
  RECEIVED_FAVORITE_LIST,
  DELETE_FAVORITE_ITEM,
} from '../actions/FavoriteActions';
import {
  findObjById,
} from '../utils/immutable';

export function favorite(state = {}, action) {
  switch (action.type) {
    case RECEIVED_FAVORITE_LIST:
      return {
        ...state,
        list: [
          ...action.data,
        ],
      };
    case DELETE_FAVORITE_ITEM: {
      const newList = findObjById(state.list, 'id', action.data, () => {
        return null;
      });
        // let newList = [...state.list];
        // newList.splice(id, action.data);
      return {
        ...state,
        list: newList,
      };
    }
    default:
      return state;
  }
}
