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
  ScrollView,
} from 'react-native';
import { ORANGE, GRAY } from '../../style/color';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import MenuItem from '../Menu/MenuItem';
const PIXEL_RATIO = PixelRatio.get();
const windowSize = Dimensions.get('window');
const styles = StyleSheet.create({
  avatarImage: {
    borderRadius: 20 * PIXEL_RATIO,
    width: 40 * PIXEL_RATIO,
    height: 40 * PIXEL_RATIO,
    flexDirection: 'row',
  },
  avatarBlock: {
    width: 50 * PIXEL_RATIO,
    height: 50 * PIXEL_RATIO,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  contentAvatar: {
    backgroundColor: ORANGE,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: windowSize.width,
    flex: 0.29,
  },
  textUserName: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    color: '#fff',
    fontWeight: '700',
    fontSize: 7 * PIXEL_RATIO,
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
    // marginLeft: 4,
    width: windowSize.width,
  },
  icon: {
    width: 32,
    height: 32,
  },
  blockIcon: {
    // backgroundColor: '#362e2e',
    flex: 1,
    // padding: 5,
    // marginLeft: -10,
  },
  blockTitle: {
    // backgroundColor: '#3b1a1a',
    flex: 1,
    // padding: 15,
    // marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockNotification: {
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    flex: 1,
    borderRadius: 10,
    width: 8 * PIXEL_RATIO,
    height: 8 * PIXEL_RATIO,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentWrapper: {
    backgroundColor: GRAY,
    flex: 1,
    flexDirection: 'column',
  },
  contentBody: {
    flex: 0.71,
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

  onItemPress = (id) => {
    this.context.drawer.close();
    const { beforeRoute } = this.props;
    if (beforeRoute !== id) {
      Actions[id]();
    }
  }

  profile() {
    this.context.drawer.close();
    if (this.props.isLogin) {
      Actions.profile.call();
    } else {
      Actions.login.call();
    }
  }

  render() {
    // const { drawer } = this.context
    const { userInfo, isLogin } = this.props;
    const loginBtnTitle = isLogin ? '登出' : '登入';
    return (
      <View style={styles.contentWrapper}>
        <View style={styles.contentAvatar}>
          <TouchableOpacity style={styles.avatarBlock} onPress={ this.profile.bind(this) }>
            <Image source={{ uri: userInfo.avatar }} style={styles.avatarImage} />
          </TouchableOpacity>
          <Text style={styles.textUserName}>{userInfo.userName}</Text>
        </View>
        <ScrollView style={styles.contentBody}>
          <MenuItem id="postList" title="附近的好康物品" img="http://qa.trademuch.co.uk/img/map.png" notification="" onItemPress={this.onItemPress} />
          <MenuItem id="postList" title="我撿的資源" img="http://qa.trademuch.co.uk/img/map.png" notification="" onItemPress={this.onItemPress} />
          <MenuItem id="postList" title="我追蹤的資源" img="http://qa.trademuch.co.uk/img/map.png" notification="" onItemPress={this.onItemPress} />
          <MenuItem id="messenger" title="我的留言板" img="http://qa.trademuch.co.uk/img/chat%EF%BC%BF60x60.png" notification="" onItemPress={this.onItemPress} />
          <MenuItem id="postList" title="我的倉庫" img="http://qa.trademuch.co.uk/img/map.png" notification="" onItemPress={this.onItemPress} />
          <MenuItem id="postList" title="尋寶去" img="http://qa.trademuch.co.uk/img/map.png" notification="" onItemPress={this.onItemPress} />
          <MenuItem id="login" title={loginBtnTitle} img="http://qa.trademuch.co.uk/img/login.png" notification="" onItemPress={this.onItemPress} />
        </ScrollView>
      </View>
		);
  }
}

SideDrawerContent.propTypes = {
  drawer: PropTypes.object,
  userInfo: PropTypes.object,
  isLogin: PropTypes.bool,
  beforeRoute: PropTypes.string,
  routeHistory: PropTypes.array,
};

SideDrawerContent.defaultProps = {
  beforeRoute: 'postList',
  routeHistory: ['postList'],
};

function _injectPropsFromStore({ auth, router }) {
  return {
    userInfo: auth.userInfo,
    isLogin: auth.isLogin,
    beforeRoute: router.beforeRoute,
    routeHistory: router.routeHistory,
  };
}

export default connect(_injectPropsFromStore, {})(SideDrawerContent);
