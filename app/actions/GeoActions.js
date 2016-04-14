export const RECEIVED_SET_LOCATION = 'RECEIVED_SET_LOCATION';

function receivedSetLocation(location) {
  return {
    type: RECEIVED_SET_LOCATION,
    data: location,
  };
}

export function requestSetLocation(location) {
  return (dispatch) => {
    dispatch(receivedSetLocation(location));
  };
}
