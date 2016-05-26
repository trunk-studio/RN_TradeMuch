
import React, {
  StyleSheet,
  View,
  Component,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Dimensions from 'Dimensions';
import MaskView from './MaskView';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import * as color from '../style/color';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { requestLoginByBuildinAccouunt } from '../actions/AuthActions';

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
    marginTop: 50,
    width: 180,
    height: 180,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'transparent',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  inputBox: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    color: '#fff',
  },
  textInput: {
    width: 160,
    height: 20,
    backgroundColor: 'rgba(88,88,88,0.5)',
    color: '#fff',
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

export default class LoginView extends Component {

  constructor(props) {
    super(props);
    this.handleLoginButtonClick = this.handleLoginButtonClick.bind(this);
    this.inputUsernameHandle = this.inputUsernameHandle.bind(this);
    this.inputPwdHandle = this.inputPwdHandle.bind(this);
    this.state = {
      username: '',
      pwd: '',
    };
  }

  handleLoginButtonClick() {
    const username = this.state.username;
    const pwd = this.state.pwd;
    // const fUsr = 'office@trunk-studio.com';
    const fUsr = 'office@trunk-studio.com';
    const fPwd = 'test-account';
    if (username && pwd) {
      const checkUsr = username === fUsr;
      const checkPwd = pwd === fPwd;
      if (checkUsr && checkPwd) {
        this.props.requestLoginByBuildinAccouunt();
      } else {
        Alert.alert('登入失敗！帳號或密碼錯誤！');
      }
    }
  }

  inputUsernameHandle(username) {
    this.setState({
      username,
    });
  }

  inputPwdHandle(pwd) {
    this.setState({
      pwd,
    });
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
        <View style={styles.formContainer} >
          <View style={styles.inputBox}>
            <Text style={styles.text}>帳　號：</Text>
            <TextInput
              style={styles.textInput}
              onChangeText= {this.inputUsernameHandle}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.text}>密　碼：</Text>
            <TextInput
              style={styles.textInput}
              onChangeText= {this.inputPwdHandle}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleLoginButtonClick}
          >
            <Text style={styles.buttonText}>登入</Text>
          </TouchableOpacity>
        </View>
        <MaskView />
        <KeyboardSpacer />
      </View>
    );
  }
}

LoginView.propTypes = {
  requestLoginByBuildinAccouunt: React.PropTypes.func,
};

function _injectPropsFromStore({ auth }) {
  return {};
}

const _injectPropsFormActions = {
  requestLoginByBuildinAccouunt,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(LoginView);
