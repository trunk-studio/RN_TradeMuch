import React, {
  StyleSheet,
  PropTypes,
  View,
  Component,
  TouchableOpacity,
  Text,
  ScrollView,
  PixelRatio,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Dimensions from 'Dimensions';
import { requestAgreePolicies } from '../actions/AuthActions';
import CheckBox from 'react-native-icon-checkbox';
import MaskView from './MaskView';
const windowSize = Dimensions.get('window');
const PIXEL_RATIO = PixelRatio.get();
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
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: 'rgb(219, 236, 232)',
  },
  policiesContainer: {
    // flex: 5.5,
    flex: 0.89,
    flexDirection: 'column',
    marginTop: 15 * PIXEL_RATIO,
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 9,
    padding: 20,
    backgroundColor: 'rgb(244, 255, 251)',
  },
  policiesText: {
    fontSize: 6 * PIXEL_RATIO,
  },
  checkBoxContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
  checkBox: {
    color: '#000',
    fontSize: 7 * PIXEL_RATIO,
  },
  buttonContainer: {
    flex: 0.11,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  buttonAgree: {
    width: 45 * PIXEL_RATIO,
    height: 15 * PIXEL_RATIO,
    backgroundColor: 'rgb(95,162,146)',
    borderRadius: 2.5 * PIXEL_RATIO,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCancel: {
    width: 45 * PIXEL_RATIO,
    height: 15 * PIXEL_RATIO,
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: 2.5 * PIXEL_RATIO,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextAgree: {
    color: 'rgba(255, 255, 255, 1)',
  },
  buttonTextCancel: {
    color: 'rgb(0, 0, 0)',
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
        <ScrollView style={styles.policiesContainer}>
          <Text style={styles.policiesText}>
            您必須遵守「TradeMuch」中向您提供的所有政策。{"\n\n"}
            請勿濫用「TradeMuch」。舉例來說，您不應干擾「TradeMuch」運作，亦不得試圖透過我們所提供的介面和操作說明以外的方法存取「TradeMuch」。
            您僅可於法律 (包括適用的出口及再出口管制法律和法規) 允許範圍內使用「TradeMuch」。如果您未遵守我們的條款或政策，或是如果我們正在調查疑似違規行為，我們可能會暫停或終止向您提供「TradeMuch」。{"\n\n"}
            使用「TradeMuch」並不會將「TradeMuch」或您所存取內容的任何智慧財產權授予您。除非相關內容的擁有者同意或法律允許，否則您一律不得使用「TradeMuch」中的內容。本條款並未授權您可使用「TradeMuch」中所採用的任何品牌標示或標誌。請勿移除、遮蓋或變造「TradeMuch」所顯示或隨附顯示的任何法律聲明。{"\n\n"}
            「TradeMuch」中顯示的部分內容並非「TradeMuch」所有，這類內容應由其提供實體承擔全部責任。我們可對內容進行審查，以判斷其是否違法或違反「TradeMuch」政策，並可移除或拒絕顯示我們合理確信違反 我們政策或法律的內容。不過，這不表示我們一定會對內容進行審查，因此請勿如此認定。{"\n\n"}
            有關您對「TradeMuch」的使用，我們會向您發送服務公告、行政管理訊息和其他資訊；您可取消接收其中某些通訊內容。{"\n\n"}
            「TradeMuch」的部分服務可以在行動裝置上使用。但請勿在會分散注意力的情況下使用這些服務，以免違反交通或安全法規。{"\n"}
          </Text>
          <View style={styles.checkBoxContainer} >
            <CheckBox
              label="我願意同意並遵守上述條款"
              size={30}
              checked={this.state.isAgreePolicies}
              onPress={this.handleCheck}
            />
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonCancel} onPress={ this.cancel }>
            <Text style={styles.buttonTextCancel}>取消</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonAgree} onPress={ this.agree }>
            <Text style={styles.buttonTextAgree}>同意</Text>
          </TouchableOpacity>
        </View>
        <MaskView />
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
