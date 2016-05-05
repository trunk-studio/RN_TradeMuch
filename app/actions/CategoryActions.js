export const RECEIVED_CATEGORY_LIST = 'RECEIVED_CATEGORY_LIST';
import { fetchWithAuth } from '../utils/authFetch';
import { errorHandle } from '../utils/errorHandle';

function receivedCategoryList(list) {
  return {
    type: RECEIVED_CATEGORY_LIST,
    data: list,
  };
}

export async function requestGetFavoriteList() {
  try {
    const response = await fetchWithAuth('/rest/category');
    const categoryList = response.result;
    return (dispatch) => {
      dispatch(receivedCategoryList(categoryList));
    };
  } catch (e) {
    errorHandle(e.message);
    return () => {};
  }
}
