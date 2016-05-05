export const RECEIVED_ADDCATEGORY_LIST = 'RECEIVED_ADDCATEGORY_LIST';
export const RECEIVED_CATEGORY_LIST = 'RECEIVED_CATEGORY_LIST';
export const RECEIVED_FILTER_CATEGORY_LIST = 'RECEIVED_FILTER_CATEGORY_LIST';
import { fetchWithAuth } from '../utils/authFetch';
import { errorHandle } from '../utils/errorHandle';
import { Actions } from 'react-native-router-flux';

function receivedAddCategoryList(list) {
  return {
    type: RECEIVED_ADDCATEGORY_LIST,
    data: list,
  };
}

function receivedCategoryList(list) {
  return {
    type: RECEIVED_CATEGORY_LIST,
    data: list,
  };
}

export async function requestGetCategoryList(hasAll) {
  try {
    const response = await fetchWithAuth('/rest/category');
    const categoryList = response.result;
    const received = hasAll ?
      receivedCategoryList(categoryList) :
      receivedAddCategoryList(categoryList);
    return (dispatch) => {
      dispatch(received);
    };
  } catch (e) {
    errorHandle(e.message);
    return () => {};
  }
}

export async function requestAddCategory(data = {
  postId: '',
  categoryIds: [],
}) {
  try {
    const response = await fetchWithAuth('/rest/category', 'put', data);
    if (response.success) {
      Actions.postList({
        type: 'reset',
      });
    }
    return () => {};
  } catch (e) {
    errorHandle(e.message);
    return () => {};
  }
}

function receivedFilterCategory(list) {
  return {
    type: RECEIVED_FILTER_CATEGORY_LIST,
    data: list,
  };
}

export async function requestFilterCategory(data = {
  categoryIds: [],
}) {
  try {
    const array = data.categoryIds.toString();
    const response = await fetchWithAuth(`/rest/category/filter?categoryIds=${array}`);
    if (response.success) {
      Actions.categoryFilterList();
    }
    return (dispatch) => {
      dispatch(receivedFilterCategory(response.result));
    };
  } catch (e) {
    errorHandle(e.message);
    return () => {};
  }
}
