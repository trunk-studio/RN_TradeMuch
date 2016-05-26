
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
    width: 100,
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

export default class Registered extends Component {

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
            <TextInput style={styles.textInput} />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.text}>密　碼：</Text>
            <TextInput style={styles.textInput} />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.text}>邀請碼：</Text>
            <TextInput style={styles.textInput} />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Alert.alert('警告', '邀請碼錯誤，請再次確認!!');
            }}
          >
            <Text style={styles.buttonText}>使用邀請碼註冊</Text>
          </TouchableOpacity>
        </View>
        <MaskView />
        <KeyboardSpacer />
      </View>
    );
  }
}
