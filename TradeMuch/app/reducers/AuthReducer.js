import {
  RECEIVED_USER_INFO,
  UPDATE_LOGIN_STATUS,
  UPDATE_USER_INFO,
} from '../actions/AuthActions';

const authDefault = {
  isLogin: false,
  userInfo: {
    isFirstLogin: null,
    isAgreePolicies: null,
  },
};

export function auth(state = authDefault, action) {
  switch (action.type) {
    case RECEIVED_USER_INFO:
      return {
        ...state,
        userInfo: action.data,
      };
    case UPDATE_USER_INFO:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          ...action.data,
        },
      };
    case UPDATE_LOGIN_STATUS:
      return {
        ...state,
        isLogin: action.data,
      };
    default:
      return state;
  }
}
