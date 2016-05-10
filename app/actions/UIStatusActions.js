export const SWITCH_MINIMAL_UI_MODE = 'SWITCH_MINIMAL_UI_MODE';
export const SWITCH_NETWORK_NOTIFY_MODE = 'SWITCH_NETWORK_NOTIFY_MODE';

function updateMinimalUIMode(data) {
  return {
    type: SWITCH_MINIMAL_UI_MODE,
    data,
  };
}

export function openMinimalUIMode() {
  return dispatch => {
    dispatch(updateMinimalUIMode(true));
  };
}

export function closeMinimalUIMode() {
  return dispatch => {
    dispatch(updateMinimalUIMode(false));
  };
}

function updateNetworkNotifyMode(data) {
  return {
    type: SWITCH_NETWORK_NOTIFY_MODE,
    data,
  };
}

export function openNetworkNotify() {
  return dispatch => {
    dispatch(updateNetworkNotifyMode(true));
  };
}

export function closeNetworkNotify() {
  return dispatch => {
    dispatch(updateNetworkNotifyMode(false));
  };
}
