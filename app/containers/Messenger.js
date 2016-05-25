import React, { Component, Dimensions, View, Alert } from 'react-native';
import { connect } from 'react-redux';
window.navigator.userAgent = 'react-native';
const io = require('socket.io-client/socket.io');
import GiftedMessenger from 'react-native-gifted-messenger';
import {
  receivedMessages,
  receivedNewMessage,
  requestClearMessages,
} from '../actions/MessengerActions';
import { getItem } from '../utils/asyncStorage';
import config from '../config/index';
import * as color from '../style/color';

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

async function joinRoom(socket, chatRoomId) {
  try {
    const url = `/rest/room/${chatRoomId}/users`;
    const request = await composeRequestWithAuthToken(url);
    return new Promise((resolve) => {
      socket.emit('post', request, (response) => {
        resolve(response);
      });
    });
  } catch (e) {
    throw e;
  }
}

async function sendMessage(socket, chatRoomId, message) {
  try {
    const url = `/rest/chat/${chatRoomId}/public`;
    const request = await composeRequestWithAuthToken(url, message);
    return new Promise((resolve) => {
      socket.emit('post', request, (response) => {
        resolve(response);
      });
    });
  } catch (e) {
    throw e;
  }
}

async function getChatHistory(socket, chatRoomId) {
  try {
    const url = `/rest/chat/${chatRoomId}/history`;
    const request = await composeRequestWithAuthToken(url);
    return new Promise((resolve) => {
      socket.emit('get', request, (response) => {
        resolve(response.body.result);
      });
    });
  } catch (e) {
    throw e;
  }
}

export default class Messenger extends Component {

  static propTypes = {
    receivedMessages: React.PropTypes.func,
    receivedNewMessage: React.PropTypes.func,
    requestClearMessages: React.PropTypes.func,
    messages: React.PropTypes.array,
    postId: React.PropTypes.number,
    sendMessageInitial: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.handleSend = this.handleSend.bind(this);
    this.handleInitial = this.handleInitial.bind(this);
    this.socket = io(`ws://${config.socketDomain}?__sails_io_sdk_version=0.13.5`, { jsonp: false, transports: ['websocket'] });
  }

  componentWillMount() {
    this.props.requestClearMessages();
    this.handleInitial();
  }

  componentWillUnmount() {
    this.props.requestClearMessages();
    this.socket.disconnect();
  }

  async handleInitial() {
    const messageHistory = await getChatHistory(this.socket, this.props.postId);
    if (messageHistory) {
      this.props.receivedMessages(messageHistory);
    }
    await joinRoom(this.socket, this.props.postId);
    this.socket.on('public', (response) => {
      this.props.receivedNewMessage(response);
    });
    if (this.props.sendMessageInitial) {
      const message = {
        text: this.props.sendMessageInitial,
      };
      this.handleSend(this.socket, message);
    }
  }

  async handleSend(message = {}, /* rowID = null*/) {
    if (!!message.text) {
      const newMessage = await sendMessage(this.socket, this.props.postId, {
        content: message.text,
      });
      this.props.receivedNewMessage({
        content: newMessage.body.content,
        user: newMessage.body.user,
      });
    }
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
          submitOnReturn
          ref={this.messengerRef}
          style={{ marginTop: 20 }}
          messages={this.props.messages}
          handleSend={this.handleSend}
          maxHeight={Dimensions.get('window').height - 45} // 64 for the navBar
          onImagePress={(rowData, rowID) => {
            if (rowData.position !== 'right') {
              Alert.alert('檢舉', '是否要檢舉此人？',
                [
                  { text: '確認', onPress: () => Alert.alert('已成功送出') },
                  { text: '取消', onPress: () => {} },
                ]
              );
            }
          }}
          styles={{
            textLeft: {
              color: '#000',
            },
            bubbleLeft: {
              backgroundColor: color.MESSENGER_BUBBLE_COLOR,
              marginRight: 70,
            },
            textRight: {
              color: '#000',
            },
            bubbleRight: {
              backgroundColor: color.MESSENGER_BUBBLE_COLOR,
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
  requestClearMessages,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(Messenger);
