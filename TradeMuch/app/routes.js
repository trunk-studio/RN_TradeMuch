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
   Actions,
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
    backgroundColor: '#666',
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

  constructor(props) {
    super(props);
    this.renderMenuButton = this.renderMenuButton.bind(this);
  }

  componentWillMount() {
    this.props.loginValidation();
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
        <Image
          source={{ uri: 'https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-64.png' }}
          style={{ height: 24, width: 24 }}
        />
      </TouchableOpacity>
    );
  }

  renderBackButton() {
    return (
      <TouchableOpacity
        style={styles.leftButtonContainer}
        onPress={Actions.pop}
      >
        <Image
          source={{ uri: 'http://i.stack.imgur.com/rXZga.png' }}
          style={{ height: 24, width: 24 }}
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
        <Route name="login" schema="boot" component={Login} title="登入" />
        <Route name="policies" component={Policies} title="服務條款" />
        <Route name="editProfile">
          <Router name="editProfileRouter">
            <Route name="editProfileView" component={EditProfile} title="確認個人資料" />
          </Router>
        </Route>
        {/* ------------------- SideDrawer Routor -------------------------- */}
        <Route name="drawer" hideNavBar type="reset" initial>
          <SideDrawer ref={this.refSideDrawer}>
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
              <Route name="messenger" component={Messenger} schema="home" title="Messenger" />
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
