import {
  RECEIVED_CREATE_POST,
  RECEIVED_UPLOAD_IMG,
  RECEIVED_INPUT_TITLE,
  RECEIVED_INPUT_DESCRIPTION,
  RECEIVED_GET_MY_ITEMS,
  RECEIVED_UPDATE_POST_STATUS_SUCCESS,
  RECEIVED_GET_TRADE_RECORDS,
  RECEIVED_UPDATE_TRADERECORD_STATUS_SUCCESS,
  RECEIVED_REQUEST_ITEM_STATUS_CHANGED_AND_USER_CONFIRMED,
  DELETE_POST_ITEM,
  RECEIVED_CREATE_POST_FINISH,
} from '../actions/PostActions';
import { RECEIVED_READ_MESSAGE } from '../actions/MessengerActions';

function findObjById(objArray, targetObjKey, targetValue, callback) {
  let newArray = [];
  newArray = [];
  for (const item of objArray) {
    if (item[targetObjKey] === targetValue) {
      const newItem = callback(item);
      if (newItem !== null) {
        newArray.push(newItem);
      }
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
          let newItem = {};
          newItem = { ...item };
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
    case RECEIVED_UPDATE_TRADERECORD_STATUS_SUCCESS: {
      const newMyItems = findObjById(
        state.myItems,
        'id',
        action.data.postId,
        (item) => {
          let newItem = {};
          newItem = { ...item };
          let record;
          for (record of newItem.records) {
            if (record.id === action.data.user_id) {
              record.status = 'accepted';
            } else {
              record.status = 'refused';
            }
          }
          return newItem;
        }
      );
      return {
        ...state,
        myItems: newMyItems,
      };
    }
    case RECEIVED_READ_MESSAGE: {
      const newMyItems = findObjById(
        state.myItems,
        'id',
        action.data,
        (item) => {
          let newItem = {};
          newItem = { ...item };
          newItem.unReadCount = 0;
          return newItem;
        }
      );
      return {
        ...state,
        myItems: newMyItems,
      };
    }
    case RECEIVED_REQUEST_ITEM_STATUS_CHANGED_AND_USER_CONFIRMED: {
      const newTradeRecords = findObjById(
        state.myTradeRecords,
        'id',
        action.data,
        (record) => {
          let newRecord = {};
          newRecord = { ...record };
          newRecord.isConfirmed = true;
          return newRecord;
        }
      );
      return {
        ...state,
        myTradeRecords: newTradeRecords,
      };
    }
    case DELETE_POST_ITEM: {
      const newMyItems = findObjById(state.myItems, 'id', action.data, () => {
        return null;
      });
      return {
        ...state,
        myItems: newMyItems,
      };
    }
    case RECEIVED_CREATE_POST_FINISH: {
      return {
        ...state,
        createFinish: action.data,
      };
    }
    default:
      return state;
  }
}
