import React, { Component, StyleSheet, Dimensions, View } from 'react-native';
import { connect } from 'react-redux';
window.navigator.userAgent = 'react-native';
const io = require('socket.io-client/socket.io');
import GiftedMessenger from 'react-native-gifted-messenger';
import {
  receivedMessages,
  receivedNewMessage,
} from '../actions/MessengerActions';
import { getItem } from '../utils/asyncStorage';
import config from '../config/index';

const socket = io(`ws://${config.socketDomain}?__sails_io_sdk_version=0.13.5`, { jsonp: false, transports: ['websocket'] });

async function composeRequestWithAuthToken(url, data) {
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

async function joinRoom(chatRoomId) {
  const url = `/rest/room/${chatRoomId}/users`;
  const request = await composeRequestWithAuthToken(url);
  return new Promise((resolve) => {
    socket.emit('post', request, (response) => {
      resolve(response);
    });
  });
}

async function sendMessage(chatRoomId, message) {
  const url = `/rest/chat/${chatRoomId}/public`;
  const request = await composeRequestWithAuthToken(url, message);
  return new Promise((resolve) => {
    socket.emit('post', request, (response) => {
      resolve(response);
    });
  });
}

async function getChatHistory(chatRoomId) {
  const url = `/rest/chat/${chatRoomId}/history`;
  const request = await composeRequestWithAuthToken(url);
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
    messages: React.PropTypes.array,
    postId: React.PropTypes.number,
    sendMessageInitial: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.handleSend = this.handleSend.bind(this);
    this.handleInitial = this.handleInitial.bind(this);
  }

  componentWillMount() {
    this.handleInitial();
  }

  async handleInitial() {
    const messageHistory = await getChatHistory(this.props.postId);
    this.props.receivedMessages(messageHistory);
    await joinRoom(this.props.postId);
    socket.on('public', (response) => {
      this.props.receivedNewMessage(response);
    });
    if (this.props.sendMessageInitial) {
      const message = {
        text: this.props.sendMessageInitial,
      };
      this.handleSend(message);
    }
  }

  async handleSend(message = {}, /* rowID = null*/) {
    const newMessage = await sendMessage(this.props.postId, {
      content: message.text,
    });
    this.props.receivedNewMessage({
      content: newMessage.body.chat.content,
      user: newMessage.body.user,
    });
  }

  messengerRef(c) {
    this._GiftedMessenger = c;
  }

  render() {
    return (
      <View>
        {/*
        // <View style={styles.nav}>
        //   <Text style={styles.navText}>Kent</Text>
        // </View>
        */}
        <GiftedMessenger
          autoScroll
          ref={this.messengerRef}
          style={{ marginTop: 20 }}
          messages={this.props.messages}
          handleSend={this.handleSend}
          maxHeight={Dimensions.get('window').height - 45} // 64 for the navBar
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
