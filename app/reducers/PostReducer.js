import {
  RECEIVED_CREATE_POST,
  RECEIVED_UPLOAD_IMG,
  RECEIVED_INPUT_TITLE,
  RECEIVED_INPUT_DESCRIPTION,
  RECEIVED_GET_MY_ITEMS,
} from '../actions/PostActions';

export function post(state = {}, action) {
  switch (action.type) {
    case RECEIVED_CREATE_POST:
      return {
        ...state,
        postFinishData: action.data,
      };
    case RECEIVED_UPLOAD_IMG:
      return {
        ...state,
        upLoadImg: action.data,
      };
    case RECEIVED_INPUT_TITLE:
      return {
        ...state,
        title: action.data,
      };
    case RECEIVED_INPUT_DESCRIPTION:
      return {
        ...state,
        description: action.data,
      };
    case RECEIVED_GET_MY_ITEMS:
      return {
        ...state,
        myItems: action.data,
      };
    default:
      return state;
  }
}
