export const SWITCH_MINIMAL_UI_MODE = 'SWITCH_MINIMAL_UI_MODE';
export const SWITCH_NETWORK_NOTIFY_MODE = 'SWITCH_NETWORK_NOTIFY_MODE';
export const TOGGLE_MASK_VIEW = 'TOGGLE_MASK_VIEW';

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


function toggleMaskView(data) {
  return {
    type: TOGGLE_MASK_VIEW,
    data,
  };
}

export function openMaskView() {
  return dispatch => {
    dispatch(toggleMaskView(true));
  };
}

export function hideMaskView() {
  return dispatch => {
    dispatch(toggleMaskView(false));
  };
}
