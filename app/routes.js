import { connect } from 'react-redux';
import { loginValidation } from './actions/AuthActions';
import { requestGetMyItems, requestGetTradeRecords } from './actions/PostActions';
import { closeMinimalUIMode, openNetworkNotify, closeNetworkNotify } from './actions/UIStatusActions';
import React, {
  Navigator,
	StyleSheet,
	TouchableOpacity,
  Component,
  PropTypes,
  Text,
  PixelRatio,
  NetInfo,
 } from 'react-native';
import ErrorUtils from 'ErrorUtils';
import ExceptionsManager from 'ExceptionsManager';
import Platform from 'Platform';
import RNRF, {
   Route,
   Schema,
   Actions,
 } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
const Router = connect()(RNRF.Router);

// Views
import Login from './containers/Login';
import Policies from './containers/Policies';
import Profile from './containers/Profile';
import SideDrawer from './components/SideDrawer/SideDrawer';
import PostList from './containers/PostList';
import CreatePost from './containers/CreatePost';
import CreateFinish from './components/CreateFinish';
import OwnerPostDetail from './components/OwnerPostDetail';
import PostDetail from './containers/PostDetail';
import NearByPosts from './containers/NearByPosts';
import Messenger from './containers/Messenger';
import MessageBoard from './containers/MessageBoard';
import TradeRecord from './containers/TradeRecord';
import FavoriteList from './containers/FavoriteList';
import MyItems from './containers/MyItems';
import Category from './containers/Category';
import GivePage from './containers/GivePage';
// colors
import {
  NAVBAR_BACKGROUND_COLOR,
  WHITE_COLOR,
} from './style/color';

const styles = StyleSheet.create({
  navBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: NAVBAR_BACKGROUND_COLOR,
  },
  transparentNavBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  navTitle: {
    color: 'white',
  },
  routerScene: {
    paddingTop: Navigator.NavigationBar.Styles.General.NavBarHeight,
  },
  transparentScene: {
    paddingTop: 0,
  },
  leftButtonContainer: {
    paddingLeft: 15,
    paddingRight: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    paddingRight: 10 * PixelRatio.get(),
    marginTop: -1,
  },
});

export default class AppRoutes extends Component {
  static propTypes = {
    loginValidation: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.renderMenuButton = this.renderMenuButton.bind(this);
    this.renderNoneButton = this.renderNoneButton.bind(this);
  }

  componentWillMount() {
    this.props.loginValidation();
    ErrorUtils.setGlobalHandler((err, isFatal) => {
      try {
        if (__DEV__) {
          ExceptionsManager.handleException(err, isFatal);
        } else {
          // TODO: Error report to server or apple server
          Actions.postList({
            type: 'reset',
          });
        }
      } catch (ee) {
        console.log('Failed to print error: ', ee.message);
      }
    });
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'change',
      this.handleConnectionInfoChange
    );
    NetInfo.isConnected.fetch().done(
      this.handleConnectionInfoChange
    );
  }

  handleConnectionInfoChange = (isConnected) => {
    isConnected ?
    this.props.closeNetworkNotify() :
    this.props.openNetworkNotify();
  }

  refSideDrawer = (ref) => {
    if (ref) {
      this.drawer = ref.drawer;
    } else {
      this.drawer = this.drawer;
    }
  }

  renderMenuButton() {
    const switchSideDrawer = () => {
      if (!this.drawer._open) {
        if (this.props.isLogin) {
          this.props.requestGetMyItems();
          this.props.requestGetTradeRecords();
        }
        this.drawer.open();
      } else {
        this.drawer.close();
      }
    };
    return (
      <TouchableOpacity
        style={styles.leftButtonContainer}
        onPress={switchSideDrawer}
      >
        <Icon
          name="list-ul"
          size={20}
          color={WHITE_COLOR}
          style={styles.menuIcon}
        />
      </TouchableOpacity>
    );
  }

  renderLoginButton = () => {
    let loginButton = [];
    if (!this.props.isLogin) {
      loginButton = [
        <TouchableOpacity key="loginbutton"
          style={styles.leftButtonContainer}
          onPress={Actions.login}
        >
          <Text style={styles.navTitle}>登入</Text>
        </TouchableOpacity>,
      ];
    }
    return loginButton;
  }

  renderBackButton() {
    return (
      <TouchableOpacity
        style={styles.leftButtonContainer}
        onPress={Actions.pop}
      >
        <Icon
          name="angle-left"
          size={24}
          color={WHITE_COLOR}
          style={styles.menuIcon}
        />
        <Text style={styles.navTitle}>返回</Text>
      </TouchableOpacity>
    );
  }

  renderNoneButton() {
    return [];
  }


  render() {
    // const isLoginPage = this.props.beforeRoute === 'login';
    // const sceneStyle = isLoginPage ? styles.transparentScene : styles.routerScene;
    // const navigationBarStyle = isLoginPage ? styles.transparentNavBar : styles.navBar;
    return (
      <Router name="root" hideNavBar>
        {/* ------------------- Schemas ------------------------------------ */}
        <Schema name="default" sceneConfig={ Navigator.SceneConfigs.FloatFromRight } />
        <Schema name="left" sceneConfig={Navigator.SceneConfigs.FloatFromLeft} />
        <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom} />
        <Schema
          name="boot"
          sceneConfig={Navigator.SceneConfigs.FloatFromRight}
          hideNavBar
          type="replace"
        />
        <Schema
          name="home"
          sceneConfig={Navigator.SceneConfigs.FloatFromRight}
          hideNavBar={false}
          renderLeftButton={this.renderMenuButton}
          // renderRightButton={this.renderLoginButton.bind(this, this.props.login)}
        />
        <Schema
          name="interior"
          sceneConfig={Navigator.SceneConfigs.FloatFromRight}
          hideNavBar={false}
          renderLeftButton={this.renderBackButton}
        />
        <Schema
          name="none"
          sceneConfig={Navigator.SceneConfigs.FloatFromRight}
          hideNavBar={false}
          renderLeftButton={this.renderNoneButton}
        />

        {/* ------------------- SideDrawer Router -------------------------- */}
        <Route name="drawer" hideNavBar type="switch" initial>
          <SideDrawer ref={this.refSideDrawer} onOpen={this.props.closeMinimalUIMode} >
            <Router
              name="drawerRoot"
              sceneStyle={styles.routerScene}
              navigationBarStyle={styles.navBar}
              titleStyle={styles.navTitle}
            >
              {/* drawer menu*/}
              <Route name="postList" component={PostList} schema="home" title="附近的好康物品" />
              <Route name="category" component={Category} schema="home" title="尋寶去" />
              <Route name="messageBoard" component={MessageBoard} schema="home" title="我的留言板" />
              <Route name="tradeRecord" component={TradeRecord} schema="home" title="交易紀錄" />
              <Route name="favoriteList" component={FavoriteList} schema="home" title="我追蹤的資源" />
              <Route name="myItems" component={MyItems} schema="home" title="我的倉庫" />
              <Route name="login" schema="interior" component={Login} title="登入" />
              <Route
                name="createPost"
                component={CreatePost}
                schema="interior"
                title="發布"
                hideNavBar={false}
              />
              <Route
                name="postDetail"
                component={PostDetail}
                schema="interior"
                title="物品檢視"
                hideNavBar={false}
              />
              <Route
                name="ownerPostDetail"
                component={OwnerPostDetail}
                schema="interior"
                hideNavBar={false}
              />
              <Route
                name="createFinish"
                component={CreateFinish}
                schema="none"
                title="完成"
                hideNavBar={false}
              />
              <Route name="policies" component={Policies} schema="none" title="服務條款" />
              <Route name="profile" component={Profile} schema="interior" title="個人資料" />
              <Route name="nearByPosts" component={NearByPosts} schema="interior" title="附近好康" />
              <Route name="messenger" component={Messenger} schema="interior" title="留言版" />
              <Route name="givePage" component={GivePage} schema="interior" title="物品名稱" />
            </Router>
          </SideDrawer>
        </Route>
      </Router>
    );
  }
}

AppRoutes.propTypes = {
  renderMenuButton: React.PropTypes.func,
  renderBackButton: React.PropTypes.func,
  requestGetMyItems: React.PropTypes.func,
  requestGetTradeRecords: React.PropTypes.func,
  isLogin: React.PropTypes.bool,
  closeMinimalUIMode: React.PropTypes.func,
  openNetworkNotify: React.PropTypes.func,
  closeNetworkNotify: React.PropTypes.func,
};


function _injectPropsFromStore({ auth, router }) {
  return {
    isLogin: auth.isLogin,
    beforeRoute: router.beforeRoute,
  };
}

const _injectPropsFormActions = {
  loginValidation,
  requestGetMyItems,
  requestGetTradeRecords,
  closeMinimalUIMode,
  openNetworkNotify,
  closeNetworkNotify,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(AppRoutes);
