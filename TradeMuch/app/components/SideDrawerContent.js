import React, {
  View,
  Component,
  PropTypes,
  StyleSheet,
  PixelRatio,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

const windowSize = Dimensions.get('window');
const styles = StyleSheet.create({
  avatarImage: {
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  avatarBlock: {
    backgroundColor: '#c94196',
    borderRadius: 50,
    width: 100,
    height: 100,
    marginTop: 50,
    marginBottom: 15,
    alignItems: 'center',
  },
  textUserName: {
    marginBottom: 40,
    color: '#fff',
    fontWeight: '700',
  },
  textNotification: {
    color: '#fff',
    fontWeight: '700',
  },
  textMenuTitle: {
    color: '#fff',
    fontWeight: '700',
  },
  cellBorder: {
    backgroundColor: 'rgba(164, 164, 164, 0.5)',
    // Trick to get the thinest line the device can display
    height: 1 / PixelRatio.get(),
    marginLeft: 4,
    width: windowSize.width,
  },
  icon: {
    width: 32,
    height: 32,
  },
  blockIcon: {
    // backgroundColor: '#362e2e',
    flex: 1,
    padding: 5,
    marginLeft: -10,
  },
  blockTitle: {
    // backgroundColor: '#3b1a1a',
    flex: 1,
    padding: 15,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockNotification: {
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    flex: 1,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentWrapper: {
    backgroundColor: '#333333',
    flex: 1,
    flexDirection: 'column',
  },
  contentBody: {
    // backgroundColor: '#b8b8b8',
    alignItems: 'center',
    width: windowSize.width,
  },
  contentAvatar: {
    backgroundColor: '#999999',
    alignItems: 'center',
    width: windowSize.width,
  },
  contentBlock: {
    // backgroundColor: '#333333',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  button: {
    width: 130,
    color: '#fff',
  },
});

export default class SideDrawerContent extends Component {
  static contextTypes = {
    drawer: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  login() {
    this.context.drawer.close();
    Actions.login.call();
  }
  profile() {
    this.context.drawer.close();
    Actions.editProfile.call();
  }
  postLit() {
    this.context.drawer.close();
    Actions.postList.call();
  }
  createPost() {
    this.context.drawer.close();
    Actions.createPost.call();
  }
  messenger() {
    this.context.drawer.close();
    Actions.messenger.call();
  }

  render() {
    // const { drawer } = this.context
    return (
      <View style={styles.contentWrapper}>
        <View style={styles.contentAvatar}>
          <TouchableOpacity style={styles.avatarBlock} onPress={ this.profile.bind(this) }>
            <Image source={{ uri: 'http://qa.trademuch.co.uk/img/human.png' }} style={styles.avatarImage} />
          </TouchableOpacity>
          <Text style={styles.textUserName}>{'Gloria'}</Text>
        </View>

        <View style={styles.contentBody}>
          <TouchableOpacity style={styles.contentBlock} onPress={ this.postLit.bind(this) }>
            <View style={styles.blockIcon}>
              <Image source={{ uri: 'http://qa.trademuch.co.uk/img/map.png' }} style={styles.icon} />
            </View>
            <View style={styles.blockTitle}>
              <Button style={styles.button} onPress={ this.postLit.bind(this)}>{'附近的好康物品'}</Button>
            </View>
            <View style={styles.blockNotification}>
              <Text style={styles.textNotification}>{'0'}</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.cellBorder} />

          <View>
            <TouchableOpacity style={styles.contentBlock} onPress={ this.profile.bind(this) }>
              <View style={styles.blockIcon}>
                <Image source={{ uri: 'http://qa.trademuch.co.uk/img/login.png' }} style={styles.icon} />
              </View>
              <View style={styles.blockTitle}>
                <Button onPress={ this.profile.bind(this) } style={styles.button}>{'EditProfile'}</Button>
              </View>
              <View style={styles.blockNotification}>
                <Text style={styles.textNotification}>{'0'}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.cellBorder} />

          <View>
            <TouchableOpacity style={styles.contentBlock} onPress={ this.createPost.bind(this) }>
              <View style={styles.blockIcon}>
                <Image source={{ uri: 'http://qa.trademuch.co.uk/img/add.png' }} style={styles.icon} />
              </View>
              <View style={styles.blockTitle}>
                <Button onPress={ this.createPost.bind(this) }	style={styles.button}>{'createPost'}</Button>
              </View>
              <View style={styles.blockNotification}>
                <Text style={styles.textNotification}>{'1'}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.cellBorder} />

          <View onPress={ this.messenger.bind(this) }>
            <TouchableOpacity style={styles.contentBlock} onPress={ this.createPost.bind(this) }>
              <View style={styles.blockIcon}>
                <Image source={{ uri: 'http://qa.trademuch.co.uk/img/chat%EF%BC%BF60x60.png' }} style={styles.icon} />
              </View>
              <View style={styles.blockTitle}>
                <Button onPress={ this.createPost.bind(this) } style={styles.button}>{'我的留言版'}</Button>
              </View>
              <View style={styles.blockNotification}>
                <Text style={styles.textNotification}>{'1'}</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>
      </View>
		);
  }
}

SideDrawerContent.propTypes = {
  drawer: PropTypes.object,
};
