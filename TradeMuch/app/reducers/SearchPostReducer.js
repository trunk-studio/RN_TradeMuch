import {
  RECEIVED_SEARCH_POST,
} from '../actions/SearchPostActions';

export function search(state = {}, action) {
  switch (action.type) {
    case RECEIVED_SEARCH_POST:
      return {
        ...state,
        postList: action.data,
      };
    default:
      return state;
  }
}
