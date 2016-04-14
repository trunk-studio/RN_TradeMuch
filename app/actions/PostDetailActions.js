import {
  fetchWithAuth,
} from '../utils/authFetch';
import { errorHandle } from '../utils/errorHandle';
import { Alert } from 'react-native';
export const RECEIVED_SEARCH_POST = 'RECEIVED_SEARCH_POST';

// -------------------------------- using the same dispatcher with search action
export function receivedSearchPost(postList) {
  return {
    type: RECEIVED_SEARCH_POST,
    data: postList,
  };
}

function findItemById(id, postList, state) {
  let tPostList = [];
  tPostList = postList;
  for (let i = 0; i < tPostList.length; i++) {
    if (tPostList[i].id === id) {
      tPostList[i].isFav = state;
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
      // const msg = `user_id:${response.item[0].user_id}/post_id:${response.item[0].post_id}`;
      // Alert.alert('result', '加入我的最愛成功!');

      postList = findItemById(data.id, postList, true);
    } else {
      // const msg = `name:${response.name}\nmessage:${response.message}`;
      Alert.alert('請先登入！');
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
      postList = findItemById(data.id, postList, false);
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
