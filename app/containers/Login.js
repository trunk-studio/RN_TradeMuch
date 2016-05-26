
import React, {
  StyleSheet,
  View,
  Component,
  Image,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
import * as color from '../style/color';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken,
} = FBSDK;
import { registFbToken, requestUserInfo, logout } from '../actions/AuthActions';
import Dimensions from 'Dimensions';
import MaskView from './MaskView';

const windowSize = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  bgContainer: {
    flex: 1,
    top: 0,
    left: 0,
    position: 'absolute',
  },
  backImg: {
    width: windowSize.width,
    height: windowSize.height,
  },
  logo: {
    marginTop: 100,
    width: 180,
    height: 180,
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
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    color: '#fff',
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 1 },
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  button: {
    margin: 20,
    height: 30,
    width: 180,
    backgroundColor: color.ACTION_BUTTON,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default class Login extends Component {

  static propTypes = {
    requestUserInfo: React.PropTypes.func,
    registFbToken: React.PropTypes.func,
    logout: React.PropTypes.func,
    isLogin: React.PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.handleLoginFinished = this.handleLoginFinished.bind(this);
    this.handleLogoutFinished = this.handleLogoutFinished.bind(this);
  }

  componentWillUpdate(nextProps) {
    const { isLogin, isFirstLogin, isAgreePolicies } = nextProps;
    if (isLogin && isFirstLogin) {
      if (isAgreePolicies === false) {
        Actions.policies();
      } else if (isAgreePolicies === true) {
        Actions.firstLoginProfile({ action: 'confirm' });
      }
    } else if (isLogin && isFirstLogin === false && isAgreePolicies === true) {
      Actions.postList();
    }
  }

  handleLoginFinished(error, result) {
    if (error) {
      Alert.alert('登入失敗', '請再試試看');
    } else {
      if (result.isCancelled) {
        // alert('Login cancelled.');
      } else {
        AccessToken.getCurrentAccessToken()
          .then((userIdentities) => {
            this.props.registFbToken(userIdentities);
          });
      }
    }
  }

  handleLogoutFinished() {
    this.props.logout();
  }

  render() {
    return (
      <View style={styles.container} >
        <View style={styles.bgContainer}>
          <Image source={{ uri: 'login' }} style={styles.backImg} />
        </View>
        <View style={styles.header}>
          <Image style={styles.logo} source={{ uri: 'http://i.imgur.com/4VdrFFQ.png' }} />
        </View>
        <View style={styles.loginButtonContainer} >
          <Text style={styles.text}>Log in or sign up with Facebook</Text>
          <LoginButton
            style={styles.loginButton}
            onLoginFinished={this.handleLoginFinished}
            onLogoutFinished={this.handleLogoutFinished}
            readPermissions={[]}
            publishPermissions={[]}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={Actions.registered}
            >
            <Text style={styles.buttonText}>使用邀請碼註冊</Text>
          </TouchableOpacity>
        </View>
        <MaskView />
      </View>
    );
  }
}

function _injectPropsFromStore({ auth }) {
  return {
    isLogin: auth.isLogin,
    isFirstLogin: auth.userInfo.isFirstLogin,
    isAgreePolicies: auth.userInfo.isAgreePolicies,
  };
}

const _injectPropsFormActions = {
  requestUserInfo,
  registFbToken,
  logout,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(Login);
