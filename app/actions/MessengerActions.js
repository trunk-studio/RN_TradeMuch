export const RECEIVED_MESSAGES = 'RECEIVED_MESSAGES';
export const RECEIVED_NEW_MESSAGE = 'RECEIVED_NEW_MESSAGE';
import { getItem } from '../utils/asyncStorage';
const userId = getItem('userId');

export async function receivedMessages(srcMessages) {
  const storeMessages = [];
  for (const message of srcMessages) {
    storeMessages.push({
      text: message.content,
      name: message.user.username,
      image: {
        uri: 'https://facebook.github.io/react/img/logo_og.png',
      },
      position: (message.user.id === userId) ? 'right' : 'left',
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

export function receivedNewMessage(srcMessage) {
  const newMessage = {
    text: srcMessage.content,
    name: srcMessage.user.username,
    image: {
      uri: 'https://facebook.github.io/react/img/logo_og.png',
    },
    position: (srcMessage.user.id === userId) ? 'right' : 'left',
    date: new Date(2015, 0, 16, 19, 0),
  };
  return (dispatch) => {
    dispatch({
      type: RECEIVED_NEW_MESSAGE,
      data: newMessage,
    });
  };
}
