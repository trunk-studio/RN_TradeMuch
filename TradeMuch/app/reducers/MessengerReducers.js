import {
  RECEIVED_MESSAGES,
  RECEIVED_NEW_MESSAGE,
} from '../actions/MessageActions';

export function messenger(state = {}, action) {
  switch (action.type) {
    case RECEIVED_MESSAGES:
      return {
        ...state,
        messages: action.data,
      };
    case RECEIVED_NEW_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          action.data,
        ],
      };
    default:
      return state;
  }
}
