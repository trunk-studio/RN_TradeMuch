import { connect } from 'react-redux';
import { loginValidation } from './actions/AuthActions';
import React, {
  Navigator,
	StyleSheet,
	TouchableOpacity,
	Image,
  Component,
  PropTypes,
 } from 'react-native';
import RNRF, {
   Route,
   Schema,
 } from 'react-native-router-flux';
const Router = connect()(RNRF.Router);

// View
import Login from './containers/Login';
import Policies from './containers/Policies';
import EditProfile from './containers/EditProfile';
import SideDrawer from './components/SideDrawer';
import PostList from './containers/PostList';
import CreatePost from './containers/CreatePost';
// import Messenger from './containers/Messenger';
// import NHSample from './containers/sampleApp';

const styles = StyleSheet.create({
  navBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  navTitle: {
    color: 'white',
  },
  routerScene: {
    paddingTop: Navigator.NavigationBar.Styles.General.NavBarHeight,
  },
  leftButtonContainer: {
    paddingLeft: 15,
    paddingRight: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default class AppRoutes extends Component {
  static propTypes = {
    loginValidation: PropTypes.func,
  };
  componentWillMount() {
    this.props.loginValidation();
  }
  renderMenuButton = () => {
    return (
      <TouchableOpacity
        style={styles.leftButtonContainer}
        onPress={() => this.drawer.open()}
      >
        <Image
          source={{ uri: 'https://github.com/efkan/rndrawer-implemented-rnrouter/blob/master/src/ic_menu_white_24dp.png' }}
          style={{ height: 24, width: 24, backgroundColor: '#790c0c' }}
        />
      </TouchableOpacity>
    );
  }
  renderBackButton = () =>  {
    return (
      <TouchableOpacity
        style={styles.leftButtonContainer}
        onPress={() => this.drawer.close()}
      >
        <Image
          source={{ url: 'https://github.com/efkan/rndrawer-implemented-rnrouter/blob/master/src/ic_arrow_back_white_24dp.png' }}
          style={{ height: 24, width: 24, backgroundColor: '#c23a3a' }}
        />
      </TouchableOpacity>
    );
  }
  render() {
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
        />
        <Schema
          name="interior"
          sceneConfig={Navigator.SceneConfigs.FloatFromRight}
          hideNavBar={false}
          renderLeftButton={this.renderBackButton}
        />

        {/* ------------------- Facebook Login Routor ---------------------- */}
        <Route name="login" schema="boot" component={Login} title="Login" />
        <Route name="policies" component={Policies} title="服務條款" />
        <Route name="editProfile">
          <Router name="editProfileRouter">
            <Route name="editProfileView" component={EditProfile} title="確認個人資料" />
          </Router>
        </Route>

        {/* ------------------- SideDrawer Routor -------------------------- */}
        <Route name="Drawer" hideNavBar type="reset" initial>
          <SideDrawer ref={c => { c ? this.drawer = c.drawer : this.drawer }}>
            <Router
              name="drawerRoot"
              sceneStyle={styles.routerScene}
              navigationBarStyle={styles.navBar}
              titleStyle={styles.navTitle}
            >
              <Route name="postList" schema="home" component={PostList} title="TradeMuch" />
              <Route
                name="createPost"
                component={CreatePost}
                schema="home"
                title="發布"
                hideNavBar={false}
              />
              <Route name="editProfile" component={EditProfile} schema="interior" title="確認個人資料" />
              {/*
                <Route name="Messenger" component={Messenger} schema="home" title="Messenger" />
              */}
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
};

function _injectPropsFromStore() {
  return {};
}

const _injectPropsFormActions = {
  loginValidation,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(AppRoutes);
