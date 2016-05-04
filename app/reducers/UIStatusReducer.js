import {
  SWITCH_MINIMAL_UI_MODE,
  SWITCH_NETWORK_NOTIFY_MODE,
} from '../actions/UIStatusActions';

const defaultState = {
  minimalMode: false,
  networkMode: false,
};

export function uiStatus(state = defaultState, action) {
  switch (action.type) {
    case SWITCH_MINIMAL_UI_MODE:
      return {
        ...state,
        minimalMode: action.data,
      };
    case SWITCH_NETWORK_NOTIFY_MODE:
      return {
        ...state,
        networkMode: action.data,
      };
    default:
      return state;
  }
}
