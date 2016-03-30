import {
  RECEIVED_CREATE_POST,
  RECEIVED_UPLOAD_IMG,
  RECEIVED_INPUT_TITLE,
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
    default:
      return state;
  }
}
