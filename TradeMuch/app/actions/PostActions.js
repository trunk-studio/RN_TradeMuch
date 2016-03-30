import {
  fetchWithAuth,
} from '../utils/authFetch';
export const REQUEST_CREATE_POST = 'REQUEST_CREATE_POST';
export const RECEIVED_CREATE_POST = 'RECEIVED_CREATE_POST';
export const RECEIVED_UPLOAD_IMG = 'RECEIVED_UPLOAD_IMG';
export const RECEIVED_INPUT_TITLE = 'RECEIVED_INPUT_TITLE';

function receivedCreate(data = {
  id: null,
  uuid: '',
  title: '',
  startDate: '',
  user_id: null,
  UserId: null,
}) {
  return {
    type: RECEIVED_CREATE_POST,
    data,
  };
}

export async function requestCreate(data = {
  detail: {
    title: '',
    startDate: '',
    endDate: '',
  },
  location: {
    latitude: 23.5989208,
    longitude: 121.0173408,
  },
  images: '',
}) {
  const searchApi = '/rest/post/create';
  const response = await fetchWithAuth(searchApi, 'POST', data);
  return (dispatch) => {
    dispatch(receivedCreate(response));
  };
}

function receivedUploadImg(data = [{
  name: '',
  src: '',
}]) {
  return {
    type: RECEIVED_UPLOAD_IMG,
    data,
  };
}

export async function requestUploadImg(data = {
  picBase64: '',
}) {
  const searchApi = '/rest/image/upload';
  const response = await fetch(searchApi, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const responseJson = await response.json();
  return (dispatch) => {
    dispatch(receivedUploadImg(responseJson));
  };
}


function receivedInputTitle(data) {
  return {
    type: RECEIVED_INPUT_TITLE,
    data,
  };
}

export async function requestInputTitle(title) {
  return (dispatch) => {
    dispatch(receivedInputTitle(title));
  };
}
