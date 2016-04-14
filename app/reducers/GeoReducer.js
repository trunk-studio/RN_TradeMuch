import {
  RECEIVED_SET_LOCATION,
} from '../actions/GeoActions';

export function geo(state = {}, action) {
  switch (action.type) {
    case RECEIVED_SET_LOCATION:
      return {
        ...state,
        location: action.data.coords,
      };
    default:
      return state;
  }
}
