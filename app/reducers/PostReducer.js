import {
  RECEIVED_CREATE_POST,
  RECEIVED_UPLOAD_IMG,
  RECEIVED_INPUT_TITLE,
  RECEIVED_INPUT_DESCRIPTION,
  RECEIVED_GET_MY_ITEMS,
  RECEIVED_UPDATE_POST_STATUS_SUCCESS,
  RECEIVED_GET_TRADE_RECORDS,
} from '../actions/PostActions';

function findObjById(objArray, targetObjKey, targetValue, callback) {
  let newArray = [];
  for (const item of objArray) {
    if (item[targetObjKey] === targetValue) {
      newArray.push(callback(item));
    } else {
      newArray.push(item);
    }
  }
  return newArray;
}

export function post(state = {}, action) {
  switch (action.type) {
    case RECEIVED_CREATE_POST:
      return {
        ...state,
        postFinishData: action.data,
      };
    case RECEIVED_UPLOAD_IMG:
      return {
        ...state,
        upLoadImg: action.data,
      };
    case RECEIVED_INPUT_TITLE:
      return {
        ...state,
        title: action.data,
      };
    case RECEIVED_INPUT_DESCRIPTION:
      return {
        ...state,
        description: action.data,
      };
    case RECEIVED_GET_MY_ITEMS:
      return {
        ...state,
        myItems: action.data,
      };
    case RECEIVED_UPDATE_POST_STATUS_SUCCESS: {
      const newMyItems = findObjById(
        state.myItems,
        'id',
        action.data.postId,
        (item) => {
          let newItem = {...item};
          newItem.status = action.data.status;
          return newItem;
        }
      );
      return {
        ...state,
        myItems: newMyItems,
      };
    }
    case RECEIVED_GET_TRADE_RECORDS:
      return {
        ...state,
        myTradeRecords: action.data,
      };
    default:
      return state;
  }
}
