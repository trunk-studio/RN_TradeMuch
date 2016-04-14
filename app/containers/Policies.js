import React, {
  StyleSheet,
  PropTypes,
  View,
  Component,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Dimensions from 'Dimensions';
import { requestAgreePolicies } from '../actions/AuthActions';
import Checkbox from 'react-native-checkbox';
const windowSize = Dimensions.get('window');

const styles = StyleSheet.create({
  backImg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: windowSize.width,
    height: windowSize.height,
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
  policiesContainer: {
    flex: 5.5,
    marginTop: 50,
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 9,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  checkBoxContainer: {
    marginTop: 5,
    marginLeft: 25,
  },
  checkBox: {
    color: 'rgba(255, 255, 255, 1)',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    margin: 20,
    backgroundColor: 'rgba(74, 74, 74, 0.3)',
    borderRadius: 9,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'rgba(255, 255, 255, 1)',
  },
});

export default class Policies extends Component {
  static propTypes = {
    requestAgreePolicies: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      isAgreePolicies: false,
    };
  }

  cancel = () => {
    Actions.login();
  }

  agree = () => {
    if (this.state.isAgreePolicies) {
      this.props.requestAgreePolicies();
    } else {
      Alert.alert('請讀完服務條款，並打勾同意');
    }
  }

  handleCheck = (checked) => {
    this.setState({
      isAgreePolicies: checked,
    });
  }

  render() {
    return (
      <View style={styles.container} >
        <Image source={{ uri: 'http://qa.trademuch.co.uk/img/splash.png' }} style={styles.backImg} />
        <ScrollView style={styles.policiesContainer}>
          <Text>
            您必須遵守「服務」中向您提供的所有政策。{"\n\n"}
            請勿濫用「服務」。舉例來說，您不應干擾「服務」運作，亦不得試圖透過我們所提供的介面和操作說明以外的方法存取「服務」。
            您僅可於法律 (包括適用的出口及再出口管制法律和法規) 允許範圍內使用「服務」。如果您未遵守我們的條款或政策，或是如果我們正在調查疑似違規行為，我們可能會暫停或終止向您提供「服務」。{"\n\n"}
            使用「服務」並不會將「服務」或您所存取內容的任何智慧財產權授予您。除非相關內容的擁有者同意或法律允許，否則您一律不得使用「服務」中的內容。本條款並未授權您可使用「服務」中所採用的任何品牌標示或標誌。請勿移除、遮蓋或變造「服務」所顯示或隨附顯示的任何法律聲明。{"\n\n"}
            「服務」中顯示的部分內容並非 TradeMuch 所有，這類內容應由其提供實體承擔全部責任。我們可對內容進行審查，以判斷其是否違法或違反 TradeMuch 政策，並可移除或拒絕顯示我們合理確信違反 我們政策或法律的內容。不過，這不表示我們一定會對內容進行審查，因此請勿如此認定。{"\n\n"}
            有關您對「服務」的使用，我們會向您發送服務公告、行政管理訊息和其他資訊；您可取消接收其中某些通訊內容。{"\n\n"}
            TradeMuch 的部分「服務」可以在行動裝置上使用。但請勿在會分散注意力的情況下使用這些「服務」，以免違反交通或安全法規。{"\n\n"}
          </Text>
        </ScrollView>
        <View style={styles.checkBoxContainer} >
          <Checkbox
            label="Agree"
            labelStyle={styles.checkBox}
            checked={this.state.isAgreePolicies}
            onChange={this.handleCheck}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={ this.cancel }>
            <Text style={styles.buttonText}>取消</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={ this.agree }>
            <Text style={styles.buttonText}>同意</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function _injectPropsFromStore(state) {
  return {
    isLogin: state.auth.isLogin,
    isAgreePolicies: state.auth.userInfo.isAgreePolicies,
  };
}

const _injectPropsFormActions = {
  requestAgreePolicies,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(Policies);
