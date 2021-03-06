import {
  fetchWithAuth,
} from '../utils/authFetch';
import { errorHandle } from '../utils/errorHandle';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
export const RECEIVED_SEARCH_POST = 'RECEIVED_SEARCH_POST';
export const RECEIVED_ADD_POSTLIST = 'RECEIVED_ADD_POSTLIST';

// -------------------------------- using the same dispatcher with search action
export function receivedSearchPost(postList) {
  return {
    type: RECEIVED_SEARCH_POST,
    data: postList,
  };
}

function setItemFavStatusById(id, postList, status) {
  let tPostList = [];
  tPostList = postList;
  for (let i = 0; i < tPostList.length; i++) {
    if (tPostList[i].id === id) {
      tPostList[i].isFav = status;
    }
  }
  return tPostList;
}

// --------------------------------------------------- Add item to favorite list
export async function requestAddItemToFavList(data = {
  id: '',
  postList: [],
}) {
  const favoriteApi = `/rest/favorite/${data.id}`;
  try {
    const response = await fetchWithAuth(favoriteApi, 'POST');

    let postList = [];
    postList = [...data.postList];

    if (response.result) {
      postList = setItemFavStatusById(data.id, postList, true);
    }

    return (dispatch) => {
      dispatch(receivedSearchPost(postList));
    };
  } catch (e) {
    errorHandle(e.message);
    return () => {};
  }
}

// ---------------------------------------------- delete item from favorite list
export async function requestDeleteItemToFavList(data = {
  id: '',
  postList: [],
}) {
  const favoriteApi = `/rest/favorite/${data.id}`;
  try {
    const response = await fetchWithAuth(favoriteApi, 'DELETE');

    let postList = [];
    postList = [...data.postList];

    if (response.result) {
      // Alert.alert('result', '刪除我的最愛成功!');
      postList = setItemFavStatusById(data.id, postList, false);
    } else {
      // const msg = `name:${response.name}\nmessage:${response.message}`;
      Alert.alert('result', '請先登入！');
    }

    return (dispatch) => {
      dispatch(receivedSearchPost(postList));
    };
  } catch (e) {
    errorHandle(e.message);
    return () => {};
  }
}

// ----------------------------------------------- get item data from server api
export async function requestGetItemDataFromAPI(data = {
  id: '',
}) {
  const getItemDataApi = `/rest/post/${data.id}`;
  try {
    const response = await fetchWithAuth(getItemDataApi, 'GET');

    return {
      type: RECEIVED_ADD_POSTLIST,
      data: response.post,
    };
  } catch (e) {
    errorHandle(e.message);
    return () => {};
  }
}

// ------------------------------------------------------------------ ask a item
export async function requestTradeItem(data = {
  id: '',
  title: '',
}) {
  const requestItemApi = `/rest/trade/${data.id}`;
  try {
    const response = await fetchWithAuth(requestItemApi, 'POST');
    let toMessengViewData = {
      title: data.title,
      postId: data.id,
    };
    if (!response.success) {
      Alert.alert('注意', '您已經索取過瞜～');
    } else {
      toMessengViewData.sendMessageInitial = `嗨！我想要${data.title}`;
    }
    Actions.messenger(toMessengViewData);
    return () => {};
  } catch (e) {
    errorHandle(e.message);
    return () => {};
  }
}
