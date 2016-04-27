export const SWITCH_MINIMAL_UI_MODE = 'SWITCH_MINIMAL_UI_MODE';

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
