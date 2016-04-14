import config from '../config/index';
import { getItem } from './asyncStorage';
const io = require('socket.io-client/socket.io');
const socketUrl = `ws://${config.socketDomain}?__sails_io_sdk_version=0.13.5`;
window.navigator.userAgent = 'react-native';

export const messengerSocket = io(socketUrl, {
  jsonp: false,
});

export async function composeRequestWithAuthToken(url, data) {
  const token = await getItem('jwt');
  return {
    url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      jwt: token,
    },
    data,
  };
}

export async function joinRoom(socket, chatRoomId) {
  const url = `/rest/room/${chatRoomId}/users`;
  const request = await composeRequestWithAuthToken(url);
  return new Promise((resolve) => {
    socket.emit('post', request, (response) => {
      resolve(response);
    });
  });
}

export async function sendMessage(socket, chatRoomId, message) {
  const url = `/rest/chat/${chatRoomId}/public`;
  const request = await composeRequestWithAuthToken(url, message);
  return new Promise((resolve) => {
    socket.emit('post', request, (response) => {
      resolve(response);
    });
  });
}

export async function getChatHistory(socket, chatRoomId) {
  const url = `/rest/chat/${chatRoomId}/history`;
  const request = await composeRequestWithAuthToken(url);
  return new Promise((resolve) => {
    socket.emit('get', request, (response) => {
      resolve(response.body.result);
    });
  });
}
