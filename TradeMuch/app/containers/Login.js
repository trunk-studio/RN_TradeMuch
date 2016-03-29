
import React, {
  StyleSheet,
  View,
  Component,
  Image,
  Text,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { FBSDKLoginButton } from 'react-native-fbsdklogin';
import { FBSDKAccessToken } from 'react-native-fbsdkcore';
import { registFbToken, requestUserInfo, logout } from '../actions/AuthActions';
import Dimensions from 'Dimensions';
const windowSize = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  backImg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: windowSize.width,
    height: windowSize.height,
  },
  logo: {
    marginTop: 100,
    width: 200,
    height: 200,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'transparent',
  },
  loginButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    color: '#fff',
  },
});

export default class Login extends Component {

  static propTypes = {
    requestUserInfo: React.PropTypes.func,
    registFbToken: React.PropTypes.func,
    logout: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.handleLoginFinished = this.handleLoginFinished.bind(this);
    this.handleLogoutFinished = this.handleLogoutFinished.bind(this);
  }

  componentWillMount() {
  }

  handleLoginFinished(error, result) {
    if (error) {
      Alert.alert('登入失敗', '請再試試看');
    } else {
      if (result.isCancelled) {
        // alert('Login cancelled.');
      } else {
        FBSDKAccessToken.getCurrentAccessToken(async userIdentities => {
          this.props.registFbToken(userIdentities);
          if (result === null) {
            // alert('Start logging in.');
          } else {
            // alert('Start logging out.');
          }
        });
      }
    }
  }

  handleLogoutFinished() {
    // alert('aa');
    this.props.logout();
  }

  render() {
    return (
      <View style={styles.container} >
        <Image source={{ uri: 'http://qa.trademuch.co.uk/img/splash.png' }} style={styles.backImg} />
        <View style={styles.header}>
          <Image style={styles.logo} source={{ uri: 'http://qa.trademuch.co.uk/img/splashLogo.png' }} />
        </View>
        <View style={styles.loginButtonContainer} >
          <Text style={styles.text}>使用 Facebook 登入</Text>
          <FBSDKLoginButton
            style={styles.loginButton}
            onLoginFinished={this.handleLoginFinished}
            onLogoutFinished={this.handleLogoutFinished}
            readPermissions={[]}
            publishPermissions={[]}
          />
        </View>
      </View>
    );
  }
}

function _injectPropsFromStore() {
  return {
  };
}

const _injectPropsFormActions = {
  requestUserInfo,
  registFbToken,
  logout,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(Login);
