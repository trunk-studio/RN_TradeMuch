import { fetchWithAuth } from '../utils/authFetch';
import * as asyncStorage from '../utils/asyncStorage';

export const REQUEST_USER_INFO = 'REQUEST_USER_INFO';
export const RECEIVED_USER_INFO = 'RECEIVED_USER_INFO';
export const UPDATE_LOGIN_STATUS = 'UPDATE_LOGIN_STATUS';
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';

async function setAsyncStorageLoginInfo(loginInfo) {
  await Promise.all([
    asyncStorage.setItem('userId', loginInfo.userId),
    asyncStorage.setItem('userName', loginInfo.userName),
    asyncStorage.setItem('email', loginInfo.email),
    asyncStorage.setItem('avatar', loginInfo.avatar),
    asyncStorage.setItem('isFirstLogin', loginInfo.isFirstLogin),
    asyncStorage.setItem('isAgreePolicies', loginInfo.isAgreePolicies),
    asyncStorage.setItem('jwt', loginInfo.jwt),
  ]);
}

function receivedUserInfo(userInfo) {
  return {
    type: RECEIVED_USER_INFO,
    data: userInfo,
  };
}
function updateUserInfo(subInfo) {
  return {
    type: UPDATE_USER_INFO,
    data: subInfo,
  };
}
function updateLoginStatus(isLogin) {
  return {
    type: UPDATE_LOGIN_STATUS,
    data: isLogin,
  };
}
export async function requestInputEmail(userInfo) {
  return (dispatch) => {
     dispatch(receivedUserInfo(userInfo));
  };
}

export async function requestUpdateUserInfo(data = {
  email: '123123@gmail.com',
  location: {
    latitude: 10,
    longitude: -10,
  },
}) {
  const updateEmail = '/rest/user';
  const responseJson = await fetchWithAuth(updateEmail, 'PUT', data);
  if (responseJson.success) {
    await asyncStorage.setItem('isFirstLogin', false);
  }
  return (dispatch) => {
    if (responseJson.success) {
      dispatch(updateUserInfo({ isFirstLogin: false }));
    }
  };
}

export async function registFbToken(userIdentities) {
  const registData = {
    FBUserID: userIdentities.userID,
    FBToken: userIdentities.tokenString,
  };
  const registUrl = '/rest/auth/app/register';
  const loginInfo = await fetchWithAuth(registUrl, 'post', registData);
  await setAsyncStorageLoginInfo(loginInfo);
  return dispatch => {
    dispatch(updateLoginStatus(true));
    dispatch(receivedUserInfo(loginInfo));
  };
}

export async function logout() {
  await Promise.all([
    asyncStorage.removeItem('userId'),
    asyncStorage.removeItem('userName'),
    asyncStorage.removeItem('email'),
    asyncStorage.removeItem('avatar'),
    asyncStorage.removeItem('isFirstLogin'),
    asyncStorage.removeItem('isAgreePolicies'),
    asyncStorage.removeItem('jwt'),
  ]);
  return dispatch => {
    dispatch(updateLoginStatus(false));
  };
}

export async function loginValidation() {
  const jwt = await asyncStorage.getItem('jwt');
  if (jwt) {
    const userId = await asyncStorage.getItem('userId');
    const userName = await asyncStorage.getItem('userName');
    const email = await asyncStorage.getItem('email');
    const isFirstLogin = await asyncStorage.getItem('isFirstLogin');
    const isAgreePolicies = await asyncStorage.getItem('isAgreePolicies');
    const avatar = await asyncStorage.getItem('avatar');
    return dispatch => {
      dispatch(receivedUserInfo({
        userId,
        userName,
        email,
        avatar,
        isFirstLogin,
        isAgreePolicies,
        jwt,
      }));
      dispatch(updateLoginStatus(true));
    };
  }
  logout();
  return () => {};
}

export async function requestAgreePolicies() {
  const response = await fetchWithAuth('/rest/user/agree-policies', 'post');
  if (response) {
    const key = Object.keys(response)[0];
    await asyncStorage.setItem(key, response[key]);
    return dispatch => {
      dispatch(updateUserInfo(response));
    };
  }
  return () => {};
}
