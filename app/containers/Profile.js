
import React, {
  StyleSheet,
  View,
  Component,
  Image,
  Text,
  PixelRatio,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import {
  requestUpdateUserInfo,
  requestInputEmail,
} from '../actions/AuthActions';
// import Dimensions from 'Dimensions';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import ActionButton from '../components/ActionButton';
import {
  TRADEMUCH_MAIN_COLOR_1,
  PROFILE_BACKGROUND_COLOR,
  WHITE_COLOR,
  PROFILE_INFO_BLOCK_BACKGROUND_EDITABLE_COLOR,
  PROFILE_INFO_BLOCK_BACKGROUND_NO_EDITABLE_COLOR

} from '../style/color';

const windowSize = Dimensions.get('window');
// const PIXEL_RATIO = PixelRatio.get();

const styles = StyleSheet.create({
  container: {
    backgroundColor: PROFILE_BACKGROUND_COLOR,
    paddingBottom: windowSize.height * 0.11,
    flex: 1,
  },
  avatar: {
    borderRadius: 60,
    width: 120,
    height: 120,
  },
  username: {
    fontSize: 18,
    marginTop: 15,
    color: TRADEMUCH_MAIN_COLOR_1,
    fontWeight: 'bold',
  },
  space: {
    flex: 0.2,
    marginTop: -20,
  },
  body: {
    flex: 0.8,
    alignItems: 'center',
  },
  bodyHeader: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingBottom: 30,
  },
  bodyInner: {
    width: 280,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    paddingBottom: 5,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  rowText: {
    fontSize: 14,
    color: TRADEMUCH_MAIN_COLOR_1,
    fontWeight: 'bold',
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    // fontSize: 20,
    paddingBottom: 10,
    color: WHITE_COLOR,
  },
  input: {
    color: TRADEMUCH_MAIN_COLOR_1,
    textAlign: 'left',
    fontSize: 15,
    height: 20,
  },
  buttonText: {
    color: WHITE_COLOR,
  },
});

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.updateEmail = this.updateEmail.bind(this);
    this.inputEmailHandle = this.inputEmailHandle.bind(this);
    this.state = {
      isConfirm: false,
      email: this.props.userInfo.email,
    };
  }

  componentWillMount() {
    this.setState({
      isConfirm: this.props.isConfirm,
    });
  }

  validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  updateEmail = () => {
    const isValid = this.validateEmail(this.state.email);
    if (isValid) {
      this.props.requestUpdateUserInfo({
        email: this.state.email,
      });
    } else {
      Alert.alert('輸入的信箱格式錯誤');
    }
  }

  inputEmailHandle(email) {
    this.setState({
      email,
    });
  }

  inputEditable = () => {
    if (this.state.isConfirm === true) {
      return true;
    }
    return false;
  }

  buttonText = () => {
    if (this.state.isConfirm === true) {
      return '確認';
    }
    return '修改';
  }

  inputStyle = () => {
    if (this.state.isConfirm === true) {
      return {
        borderStyle: 'dashed',
        backgroundColor: 'white',
        width: 180,
      };
    }
    return {
      width: 120,
    };
  }

  bodyColor = () => {
    if (this.state.isConfirm === true) {
      return PROFILE_INFO_BLOCK_BACKGROUND_EDITABLE_COLOR;
    }
    return PROFILE_INFO_BLOCK_BACKGROUND_NO_EDITABLE_COLOR;
  }

  handleActionButtonPress = () => {
    if (this.state.isConfirm === true) {
      this.updateEmail();
    }
    this.setState({
      isConfirm: !this.state.isConfirm,
    });
  }

  render() {
    const { userInfo } = this.props;
    return (
      <View style={styles.container} >
        <View style={styles.space} />
        <View style={styles.body}>
          <View style={styles.bodyHeader}>
            <Image style={styles.avatar} source={{ uri: userInfo.avatar }} />
            <Text style={styles.username}>{userInfo.userName}</Text>
          </View>
          <View style={[styles.bodyInner, { backgroundColor: this.bodyColor() }]} >
            <View style={styles.row} >
              <Text style={styles.rowText}>Email： </Text>
              <TextInput
                editable={this.inputEditable()}
                style={[styles.input, this.inputStyle()]}
                placeholder="尚未輸入Email"
                placeholderTextColor={TRADEMUCH_MAIN_COLOR_1}
                value={this.state.email}
                onChangeText= { this.inputEmailHandle }
                returnKeyType={'done'}
                maxLength={25}
              />
            </View>
          </View>
        </View>
        <KeyboardSpacer />
        <ActionButton
          text={this.buttonText()}
          onPress={this.handleActionButtonPress}
        />
      </View>
    );
  }
}

Profile.propTypes = {
  isConfirm: React.PropTypes.bool,
  userInfo: React.PropTypes.object,
  requestUpdateUserInfo: React.PropTypes.func,
  requestInputEmail: React.PropTypes.func,
};

function _injectPropsFromStore(state) {
  return {
    userInfo: state.auth.userInfo,
    isFirstLogin: state.auth.userInfo.isFirstLogin,
  };
}

const _injectPropsFormActions = {
  requestUpdateUserInfo,
  requestInputEmail,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(Profile);
