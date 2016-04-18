import {
  RECEIVED_MESSAGES,
  RECEIVED_NEW_MESSAGE,
  CLEAR_MESSAGES,
} from '../actions/MessengerActions';

export function messenger(state = { messages: [] }, action) {
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
    case CLEAR_MESSAGES:
      return {
        ...state,
        messages: [],
      };
    default:
      return state;
  }
}
