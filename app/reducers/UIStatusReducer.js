import {
  SWITCH_MINIMAL_UI_MODE,
} from '../actions/UIStatusActions';

const defaultState = {
  minimalMode: false,
};

export function uiStatus(state = defaultState, action) {
  switch (action.type) {
    case SWITCH_MINIMAL_UI_MODE:
      return {
        ...state,
        minimalMode: action.data,
      };
    default:
      return state;
  }
}
