import { fetchWithAuth } from '../utils/authFetch';
import { errorHandle } from '../utils/errorHandle';
import config from '../config/index';
import { receivedTakePhoto } from '../actions/TakePhotoActions';
export const REQUEST_CREATE_POST = 'REQUEST_CREATE_POST';
export const RECEIVED_CREATE_POST = 'RECEIVED_CREATE_POST';
export const RECEIVED_UPLOAD_IMG = 'RECEIVED_UPLOAD_IMG';
export const RECEIVED_INPUT_TITLE = 'RECEIVED_INPUT_TITLE';
export const RECEIVED_INPUT_DESCRIPTION = 'RECEIVED_INPUT_Description';
export const RECEIVED_ADD_POSTLIST = 'RECEIVED_ADD_POSTLIST';
export const RECEIVED_GET_MY_ITEMS = 'RECEIVED_GET_MY_ITEMS';
export const RECEIVED_UPDATE_POST_STATUS_SUCCESS = 'RECEIVED_UPDATE_POST_STATUS_SUCCESS';
export const RECEIVED_UPDATE_POST_STATUS_FAIL = 'RECEIVED_UPDATE_POST_STATUS_FAIL';
export const RECEIVED_GET_TRADE_RECORDS = 'RECEIVED_GET_TRADE_RECORDS';
export const RECEIVED_UPDATE_TRADERECORD_STATUS_SUCCESS =
  'RECEIVED_UPDATE_TRADERECORD_STATUS_SUCCESS';
export const RECEIVED_UPDATE_TRADERECORD_STATUS_FAIL =
  'RECEIVED_UPDATE_TRADERECORD_STATUS_FAIL';


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

function receivedAddToList(data) {
  return {
    type: RECEIVED_ADD_POSTLIST,
    data,
  };
}

function receivedInputDescription(data) {
  return {
    type: RECEIVED_INPUT_DESCRIPTION,
    data,
  };
}

function receivedInputTitle(data) {
  return {
    type: RECEIVED_INPUT_TITLE,
    data,
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
    response.location = {
      lat: data.location.latitude,
      lon: data.location.longitude,
    };
    response.pic = data.images;
    response.distance = 0;
    response.isFav = false;
    return (dispatch) => {
      dispatch(receivedAddToList(response));
      dispatch(receivedCreate(response));
      dispatch(receivedInputTitle(''));
      dispatch(receivedInputDescription(''));
      dispatch(receivedUploadImg());
      dispatch(receivedTakePhoto({ uri: '' }));
    };
  } catch (e) {
    errorHandle(e.message);
    return () => {};
  }
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

export async function requestInputTitle(title) {
  return (dispatch) => {
    dispatch(receivedInputTitle(title));
  };
}

export async function requestInputDescription(description) {
  return (dispatch) => {
    dispatch(receivedInputDescription(description));
  };
}

export function receivedGetMyItems(postList) {
  return {
    type: RECEIVED_GET_MY_ITEMS,
    data: postList,
  };
}

export async function requestGetMyItems() {
  const getMyItemsApi = '/rest/post/mypost';
  try {
    const postList = await fetchWithAuth(getMyItemsApi);
    return (dispatch) => {
      dispatch(receivedGetMyItems(postList.data));
    };
  } catch (e) {
    errorHandle(e.message);
    return () => {};
  }
}

export function receivedUpdatePostStatus(isSuccess, postId, status) {
  let actionType;
  if (isSuccess) {
    actionType = RECEIVED_UPDATE_POST_STATUS_SUCCESS;
  } else {
    actionType = RECEIVED_UPDATE_POST_STATUS_FAIL;
  }
  return {
    type: actionType,
    data: {
      postId,
      status,
    },
  };
}

export async function requestUpdatePostStatus(postId, status) {
  try {
    const data = {
      postId,
      status,
    };
    const result = await fetchWithAuth('/rest/post/status', 'put', data);
    return (dispatch) => {
      dispatch(receivedUpdatePostStatus(result.success, postId, status));
    };
  } catch (e) {
    errorHandle(e.message);
    return () => {};
  }
}

export function receivedGetTradeRecords(list) {
  return {
    type: RECEIVED_GET_TRADE_RECORDS,
    data: list,
  };
}

export async function requestGetTradeRecords() {
  try {
    const result = await fetchWithAuth('/rest/trade/list');
    return (dispatch) => {
      dispatch(receivedGetTradeRecords(result.data));
    };
  } catch (e) {
    errorHandle(e.message);
    return () => {};
  }
}

// ------------------------------------------------------------------ ask a item
export function receivedUpdateTradeRecordStatus(isSuccess, recordId, status) {
  let actionType;
  if (isSuccess) {
    actionType = RECEIVED_UPDATE_TRADERECORD_STATUS_SUCCESS;
  } else {
    actionType = RECEIVED_UPDATE_TRADERECORD_STATUS_FAIL;
  }
  return {
    type: actionType,
    data: {
      recordId,
      status,
    },
  };
}

// ------------------------------------------------------------------ ask a item
export async function requestUpdateTradeRecordStatus(postId, userId, action) {
  try {
    const data = {
      postId,
      userId,
      action,
    };
    const result = await fetchWithAuth('/rest/trade/', 'put', data);
    return (dispatch) => {
      dispatch(receivedUpdateTradeRecordStatus(result.success, result.id, status));
    };
  } catch (e) {
    errorHandle(e.message);
    return () => {};
  }
}
