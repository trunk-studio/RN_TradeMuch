import React, { Component, StyleSheet, Dimensions, View, Text } from 'react-native';
import { connect } from 'react-redux';
window.navigator.userAgent = 'react-native';
const io = require('socket.io-client/socket.io');
import GiftedMessenger from 'react-native-gifted-messenger';
import {
  receivedMessages,
  receivedNewMessage,
} from '../actions/MessageActions';
import config from '../config/config';

const socket = io(`ws://${config.domain}?__sails_io_sdk_version=0.13.5`, { jsonp: false });

function composeRequestWithAuthToken(url, data) {
  return {
    url,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: {
      ...data,
      user: {
        age: 0,
        createdAt: '2016-03-24T04:10:10.000Z',
        email: 'test@gmail.com',
        firstName: null,
        fullName: null,
        gender: 'none',
        id: 1,
        isFirstLogin: true,
        lastName: null,
        telephone: null,
        updatedAt: '2016-03-24T04:10:10.000Z',
        username: 'testuser',
        uuid: null,
      },
    },
  };
}

async function joinRoom(chatRoomId) {
  const url = `/rest/room/${chatRoomId}/users`;
  const request = composeRequestWithAuthToken(url);
  return new Promise((resolve) => {
    socket.emit('post', request, (response) => {
      resolve(response);
    });
  });
}

async function sendMessage(chatRoomId, message) {
  const url = `/rest/chat/${chatRoomId}/public`;
  const request = composeRequestWithAuthToken(url, message);
  return new Promise((resolve) => {
    socket.emit('post', request, (response) => {
      resolve(response);
    });
  });
}

async function getChatHistory(chatRoomId) {
  const url = `/rest/chat/${chatRoomId}/history`;
  const request = composeRequestWithAuthToken(url);
  return new Promise((resolve) => {
    socket.emit('get', request, (response) => {
      resolve(response.body.result);
    });
  });
}

const styles = StyleSheet.create({
  nav: {
    backgroundColor: '#007aff',
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    marginTop: 15,
    color: '#FFF',
  },
});


export default class Messenger extends Component {

  static propTypes = {
    receivedMessages: React.PropTypes.func,
    receivedNewMessage: React.PropTypes.func,
    messages: React.PropTypes.object,
  };

  componentWillMount() {
    socket.on('connect', async () => {
      // const token = await getAuthToken();
      await joinRoom(1);
      const messageHistory = await getChatHistory(1);
      this.props.receivedMessages(messageHistory);
      socket.on('public', (response) => {
        this.props.receivedNewMessage(response);
      });
    });
  }

  async handleSend(message = {}, /* rowID = null*/) {
    // Send message.text to your server
    // {text: "123", name: "Sender", image: null, position: "right", date: Fri Mar 25 2016 01:15:14 GMT+0800 (CST)…}
    await sendMessage(1, {
      content: message.text,
    });
  }

  messengerRef(c) {
    this._GiftedMessenger = c;
  }

  render() {
    return (
      <View>
        <View style={styles.nav}>
          <Text style={styles.navText}>Kent</Text>
        </View>
        <GiftedMessenger
          ref={this.messengerRef}
          style={{ marginTop: 20 }}
          messages={this.props.messages}
          handleSend={this.handleSend}
          maxHeight={Dimensions.get('window').height - 64} // 64 for the navBar
          styles={{
            bubbleLeft: {
              backgroundColor: '#e6e6eb',
              marginRight: 70,
            },
            bubbleRight: {
              backgroundColor: '#007aff',
              marginLeft: 70,
            },
          }}
        />
      </View>
    );
  }
}

function _injectPropsFromStore({ messenger }) {
  return {
    messages: messenger.messages,
  };
}

const _injectPropsFormActions = {
  receivedMessages,
  receivedNewMessage,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(Messenger);
