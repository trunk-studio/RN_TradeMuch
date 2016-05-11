export const RECEIVED_MESSAGES = 'RECEIVED_MESSAGES';
export const RECEIVED_NEW_MESSAGE = 'RECEIVED_NEW_MESSAGE';
export const RECEIVED_READ_MESSAGE = 'RECEIVED_READ_MESSAGE';
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES';
import { getItem } from '../utils/asyncStorage';

export async function receivedMessages(srcMessages) {
  const storeMessages = [];
  const userId = await getItem('userId');

  for (const message of srcMessages) {
    storeMessages.push({
      text: message.content,
      name: message.user.username,
      image: {
        uri: message.avatar,
      },
      position: (message.user.id.toString() === userId) ? 'right' : 'left',
      date: new Date(message.datetime),
    });
  }
  return (dispatch) => {
    dispatch({
      type: RECEIVED_MESSAGES,
      data: storeMessages,
    });
  };
}

export async function receivedNewMessage(srcMessage) {
  const userId = await getItem('userId');

  const newMessage = {
    text: srcMessage.content,
    name: srcMessage.user.username,
    image: {
      uri: srcMessage.avatar,
    },
    position: (srcMessage.user.id.toString() === userId) ? 'right' : 'left',
    date: new Date(srcMessage.datetime),
  };
  return (dispatch) => {
    dispatch({
      type: RECEIVED_NEW_MESSAGE,
      data: newMessage,
    });
  };
}


export async function requestClearMessages() {
  return (dispatch) => {
    dispatch({
      type: CLEAR_MESSAGES,
    });
  };
}

export async function receivedReadMessages(postId) {
  return (dispatch) => {
    dispatch({
      type: RECEIVED_READ_MESSAGE,
      data: postId,
    });
  };
}
