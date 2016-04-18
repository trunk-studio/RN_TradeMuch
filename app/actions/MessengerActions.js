export const RECEIVED_MESSAGES = 'RECEIVED_MESSAGES';
export const RECEIVED_NEW_MESSAGE = 'RECEIVED_NEW_MESSAGE';
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
        uri: 'https://facebook.github.io/react/img/logo_og.png',
      },
      position: (message.user.id.toString() === userId) ? 'right' : 'left',
      date: new Date(2015, 0, 16, 19, 0),
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
      uri: 'https://facebook.github.io/react/img/logo_og.png',
    },
    position: (srcMessage.user.id.toString() === userId) ? 'right' : 'left',
    date: new Date(2015, 0, 16, 19, 0),
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
