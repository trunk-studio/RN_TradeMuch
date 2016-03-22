import React, { StyleSheet, Dimensions, View, Text } from 'react-native';
import GiftedMessenger from 'react-native-gifted-messenger';
import io from 'socket.io-client/socket.io';

window.navigator.userAgent = 'react-native';

const socket = io('ws://localhost:1337?__sails_io_sdk_version=0.13.5', {jsonp: false});
// io.on('connection', function(socket){
//   socket.on('chat message', function(msg){
//     console.log('message: ' + msg);
//   });
// });

socket.on('connect',function() {
  console.log('connected');

  const request = {
    url: '/chat/1/history',
    headers: { accept: '*/*' }
  };

  socket.emit('get', request, function(p1, p2){
    console.log('=== get data ===');
    console.log(p1);
    console.log(p2);
  });

});




// socket.emit('message','hi');

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

export default function GiftedMessengerExample() {
  function getMessages() {
    return [
      {
        text: 'Are you building a chat app?',
        name: 'React-Native',
        image: {
          uri: 'https://facebook.github.io/react/img/logo_og.png',
        },
        position: 'left',
        date: new Date(2015, 0, 16, 19, 0),
      },
      {
        text: 'Yes, and I use Gifted Messenger!',
        name: 'Developer',
        image: null,
        position: 'right',
        date: new Date(2015, 0, 17, 19, 0),
      },
    ];
  }

  function handleSend(message = {}, rowID = null) {
    // Send message.text to your server
  }

  // function handleReceive() {
  //   this._GiftedMessenger.appendMessage({
  //     text: 'Received message',
  //     name: 'Friend',
  //     image: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
  //     position: 'left',
  //     date: new Date(),
  //   });
  // }

  function messengerRef(c) {
    this._GiftedMessenger = c;
  }

  return (
    <View>
      <View style={styles.nav}>
        <Text style={styles.navText}>Kent</Text>
      </View>
      <GiftedMessenger
        ref={messengerRef}
        style={{ marginTop: 20 }}
        messages={getMessages()}
        handleSend={handleSend}
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
