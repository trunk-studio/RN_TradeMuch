export const RECEIVED_FAVORITE_LIST = 'RECEIVED_FAVORITE_LIST';
export const DELETE_FAVORITE_ITEM = 'DELETE_FAVORITE_ITEM';
import {
  fetchWithAuth,
} from '../utils/authFetch';

function receivedFavoriteList(location) {
  return {
    type: RECEIVED_FAVORITE_LIST,
    data: location,
  };
}

function deleteFavorite(id) {
  return {
    type: DELETE_FAVORITE_ITEM,
    data: id,
  };
}

export async function requestGetFavoriteList() {
  const response = await fetchWithAuth('/rest/favorites');
  let favoriteList = response.result;
  delete favoriteList.requestStatus;
  return (dispatch) => {
    dispatch(receivedFavoriteList(favoriteList));
  };
}

export async function requestDeleteFavorite(id) {
  const result = await fetchWithAuth(`/rest/favorite/${id}`, 'delete');
  if (result.result) {
    return (dispatch) => {
      dispatch(deleteFavorite(id));
    };
  }
  return () => {};
}
