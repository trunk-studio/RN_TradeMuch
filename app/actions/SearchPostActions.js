import { fetchWithAuth } from '../utils/authFetch.js';
import { errorHandle } from '../utils/errorHandle';
export const REQUEST_SEARCH_POST = 'REQUEST_SEARCH_POST';
export const RECEIVED_SEARCH_POST = 'RECEIVED_SEARCH_POST';
export const RECEIVED_SEARCH_POST_NEXT = 'RECEIVED_SEARCH_POST_NEXT';
export const RECEIVED_SAVE_SEARCH_API = 'RECEIVED_SAVE_SEARCH_API';
export const RECEIVED_SEARCH_LOAD_MORE = 'RECEIVED_SEARCH_LOAD_MORE';

export function receivedSearchPost(postList) {
  return {
    type: RECEIVED_SEARCH_POST,
    data: postList.items,
  };
}

export function receivedLastSearchApi(api) {
  return {
    type: RECEIVED_SAVE_SEARCH_API,
    data: api,
  };
}

export function receivedSearchLoadMore(data) {
  return {
    type: RECEIVED_SEARCH_LOAD_MORE,
    data,
  };
}

export async function requestSearchLoadMore(data) {
  return (dispatch) => {
    dispatch(receivedSearchLoadMore(data));
  };
}

export async function requestSearchPost(keyword, distance, location) {
  const paramArray = [];
  if (keyword) {
    paramArray.push(`keyword=${keyword}`);
  }
  if (location) {
    paramArray.push(`lat=${location.lat}`);
    paramArray.push(`lon=${location.lon}`);
  }
  if (distance) {
    paramArray.push(`distance=${distance}`);
  }
  const param = paramArray.join('&');
  const searchApi = `/rest/post/search?${param}`;
  try {
    const postList = await fetchWithAuth(searchApi);
    return (dispatch) => {
      dispatch(receivedLastSearchApi(searchApi));
      if (postList.items.length > 0) {
        dispatch(receivedSearchLoadMore(true));
      }
      dispatch(receivedSearchPost(postList));
    };
  } catch (e) {
    errorHandle(e.message);
    return () => {};
  }
}

export function receivedSearchPostNextPage(postList) {
  return {
    type: RECEIVED_SEARCH_POST_NEXT,
    data: postList.items,
  };
}

export async function requestSearchPostNextPage(lastSearchApi, from) {
  let paramArray = [];
  paramArray = lastSearchApi.split('&');
  paramArray.push(`from=${from}`);
  const param = paramArray.join('&');
  const searchApi = `/rest/post/search?${param}`;
  try {
    const postList = await fetchWithAuth(searchApi);
    return (dispatch) => {
      if (postList.items.length > 0) {
        dispatch(receivedSearchLoadMore(true));
      }
      dispatch(receivedSearchPostNextPage(postList));
    };
  } catch (e) {
    errorHandle(e.message);
    return () => {};
  }
}
