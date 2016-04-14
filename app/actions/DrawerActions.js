import {
  fetchWithAuth,
} from '../utils/authFetch';
import config from '../config/index';
import { errorHandle } from '../utils/errorHandle';
export const REQUEST_CREATE_POST = 'REQUEST_CREATE_POST';
export const RECEIVED_CREATE_POST = 'RECEIVED_CREATE_POST';
export const RECEIVED_UPLOAD_IMG = 'RECEIVED_UPLOAD_IMG';
export const RECEIVED_INPUT_TITLE = 'RECEIVED_INPUT_TITLE';
export const RECEIVED_INPUT_DESCRIPTION = 'RECEIVED_INPUT_Description';

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
    description: '',
    startDate: '',
    endDate: '',
  },
  location: {
    latitude: 23.5989208,
    longitude: 121.0173408,
  },
  images: '',
}) {
  const postCreateApi = '/rest/post/create';
  try {
    const response = await fetchWithAuth(postCreateApi, 'POST', data);
    return (dispatch) => {
      dispatch(receivedCreate(response));
    };
  } catch (e) {
    errorHandle(e.message);
    return () => {};
  }
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
  const upLoadImgApi = `${config.serverDomain}/rest/image/upload`;
  const response = await fetch(upLoadImgApi, {
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


function receivedInputDescription(data) {
  return {
    type: RECEIVED_INPUT_DESCRIPTION,
    data,
  };
}

export async function requestInputDescription(description) {
  return (dispatch) => {
    dispatch(receivedInputDescription(description));
  };
}
