import React, {
  View,
  Image,
  TouchableOpacity,
  Text,
  Component,
  Linking,
  Alert,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import config from '../config/index';
import LinearGradient from 'react-native-linear-gradient';
import Dimensions from 'Dimensions';
import {
  requestAddItemToFavList,
  requestDeleteItemToFavList,
  requestTradeItem,
  requestGetItemDataFromAPI,
} from '../actions/PostDetailActions';
import { Actions } from 'react-native-router-flux';
import MaskView from './MaskView';
import { ShareDialog } from 'react-native-fbsdk';
const windowSize = Dimensions.get('window');
import { BlurView, VibrancyView } from 'react-native-blur';
import LightBox from 'react-native-lightbox';
// const PIXEL_RATIO = PixelRatio.get();
const PIXEL_RATIO = 3;
const styles = React.StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: 'stretch',
  },
  itemImg: {
    position: 'absolute',
    left: 0 * PIXEL_RATIO,
    top: 0 * PIXEL_RATIO,
    width: windowSize.width,
    height: windowSize.height,
  },
  noneImg: {
    position: 'absolute',
    left: windowSize.width / 2 - 50 * PIXEL_RATIO,
    top: windowSize.width / 2,
    width: 100 * PIXEL_RATIO,
    height: 100 * PIXEL_RATIO,
    borderColor: 'rgba(255, 255, 255, 1)',
  },
  textContainer: {
    top: 15 * PIXEL_RATIO,
    position: 'absolute',
    height: windowSize.height * 0.67,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 10 * PIXEL_RATIO,
    // flex: 1,
  },
  titleContainer: {
    justifyContent: 'flex-start',
    flex: 0.5,
    paddingTop: 60,
    paddingLeft: 20,
    flexDirection: 'row',
  },
  title: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 25,
    textAlign: 'left',
    width: 175,
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 1 },
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  descriptionContainer: {
    // justifyContent: 'flex-end',
    flex: 1,
    padding: 40,
  },
  description: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 18,
    marginBottom: 5 * PIXEL_RATIO,
    textAlign: 'left',
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 1 },
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  buttonContainer: {
    width: windowSize.width,
    bottom: 10 * PIXEL_RATIO,
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: 5 * PIXEL_RATIO,
    paddingRight: 5 * PIXEL_RATIO,
    paddingTop: 50 * PIXEL_RATIO,
  },
  button: {
    flex: 1,
    margin: 10,
    height: 50,
    // width: 100 * PIXEL_RATIO,
    borderRadius: 3 * PIXEL_RATIO,
    borderWidth: 0.5 * PIXEL_RATIO,
    backgroundColor: 'rgba(74, 74, 74, 0.3)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 14,
  },
  footContainer: {
    flex: 1,
  },
  footBackColor: {
    height: windowSize.height / 3,
    width: windowSize.width,
    position: 'absolute',
    bottom: 0,
  },
  buttonChatContainer: {
    backgroundColor: 'rgba(102, 102, 102, 0.5)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 2,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 30,
  },
  openChatRoomText: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 14,
  },
  openChatRoomButton: {
    backgroundColor: 'rgba(102, 102, 102, 0.5)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15 * PIXEL_RATIO,
    borderWidth: 0.5 * PIXEL_RATIO,
    width: 30 * PIXEL_RATIO,
    height: 30 * PIXEL_RATIO,
    top: 15 * PIXEL_RATIO,
    right: 5 * PIXEL_RATIO,
    position: 'absolute',
  },
});


export default class PostDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      postItem: {},
    };
  }

  componentWillMount() {
    this.willMount();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.postList !== this.props.postList) {
      const postItem = this.findPostItemById();
      this.setState({
        postItem,
      });
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.postList !== this.props.postList) {
      const postItem = this.findPostItemById();
      this.setState({
        postItem,
      });
    }
  }


  getItNowButtonHandle = () => {
    if (this.props.isLogin) {
      this.props.requestTradeItem({
        id: this.props.id,
        title: this.state.postItem.title,
      });
    } else {
      this.pleaseLogin();
    }
  }

  willMount() {
    const postItem = this.findPostItemById();
    this.setState({
      postItem,
    });
  }

  deleteFavoriteItemButtonHandle = () => {
    this.props.requestDeleteItemToFavList({
      id: this.props.id,
      postList: this.props.postList,
    });
  }

  addItemToFavoriteButtonHandle = () => {
    this.props.requestAddItemToFavList({
      id: this.props.id,
      postList: this.props.postList,
    });
  }

  openChatRoomButtonHandle = () => {
    if (this.props.isLogin) {
      Actions.messenger({
        title: this.state.postItem.title,
        postId: this.props.id,
      });
    } else {
      this.pleaseLogin();
    }
  }

  pleaseLogin = () => {
    Alert.alert(
      '需要登入喔',
      '登入後體驗更多 TradeMuch 細節', [{
        text: '取消',
      }, {
        text: '登入',
        onPress: () => Actions.login(),
      }]
    );
  }

  openMapButtonHandle = () => {
    const lon = this.state.postItem.location.lon;
    const lat = this.state.postItem.location.lat;
    const url = `https://www.google.com.tw/maps/place/${lat},${lon}`;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  }

  openShareButtonHandle = () => {
    const { postItem } = this.state;
    const shareInfo = {
      contentType: 'link',
      contentUrl: `http://qa.trademuch.co.uk/sns/post/${postItem.id}`,
      contentDescription: `我在 TradeMuch 發現了一個『${postItem.title}』感覺還不錯耶！一起來看看吧 :)`,
    };
    ShareDialog.canShow(shareInfo).then(
      function(canShow) {
        if (canShow) {
          return ShareDialog.show(shareInfo);
        }
      }
    ).then(
      function(result) {
        if (result.isCancelled) {
          Alert.alert('Share cancelled');
        } else {
          Alert.alert('Share success with postId:');
        }
      },
      function(error) {
        alert('Share fail with error: ' + error);
      }
    );
  }

  findPostItemById = () => {
    const postList = this.props.postList;
    let postItem = {};
    for (let i = 0; i < postList.length; i++) {
      if (postList[i].id === this.props.id) {
        postItem = postList[i];
      }
    }
    if (!postItem.id) {
      this.props.requestGetItemDataFromAPI({
        id: this.props.id,
      });
    }
    return postItem;
  }

  render() {
    const { title, description, pic, isFav } = this.state.postItem;
    if (title === null) {
      Actions.postList.call();
    }

    let favButton = [];
    if (isFav === true) {
      favButton = [
        <TouchableOpacity
          key="favButton"
          style={styles.button}
          onPress={ this.deleteFavoriteItemButtonHandle }
        >
          <Text style={styles.buttonText} >取消追蹤</Text>
        </TouchableOpacity>,
      ];
    } else {
      favButton = [
        <TouchableOpacity
          key="favButton"
          style={styles.button}
          onPress={ this.addItemToFavoriteButtonHandle }
        >
          <Text style={styles.buttonText} >追蹤</Text>
        </TouchableOpacity>,
      ];
    }
    const itemImg = {
      flex: 1,
      width: windowSize.width,
      height: parseInt(windowSize.width / 16.0 * 9.0),
    };

    return (
      <View style={styles.imageContainer}>
        <Image source={{ uri: `${config.serverDomain}/${pic}` }} style={styles.itemImg} >
          <BlurView blurType="light" style={styles.itemImg} />
        </Image>
        <LinearGradient
          key="backGround"
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
          style={styles.footBackColor}
        />
        <View style={styles.titleContainer}>
          <View style={{flex: 1}}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={{ flex: 1, paddingLeft: 150, paddingTop: 5, }}>
            <TouchableOpacity
              style={styles.buttonChatContainer}
              onPress={ this.openChatRoomButtonHandle }
            >
              <Text style={styles.openChatRoomText} >對話</Text>
            </TouchableOpacity>
          </View>
        </View>
        <LightBox>
          <Image
            resizeMode="contain"
            source={{ uri: `${config.serverDomain}/${pic}` }}
            style={itemImg}
          />
        </LightBox>
        <ScrollView style={styles.descriptionContainer}>
          <Text style={styles.description}>{description}</Text>
        </ScrollView>
        <View style={styles.footContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={ this.getItNowButtonHandle }
            >
              <Text style={styles.buttonText} >立即交易</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={ this.openMapButtonHandle }
            >
              <Text style={styles.buttonText} >地圖</Text>
            </TouchableOpacity>
            {favButton}
            <TouchableOpacity
              style={styles.button}
              onPress={ this.openShareButtonHandle }
            >
              <Text style={styles.buttonText} >分享</Text>
            </TouchableOpacity>
          </View>
        </View>
        <MaskView />
      </View>
    );
  }
}

PostDetail.propTypes = {
  id: React.PropTypes.number,
  postList: React.PropTypes.array,
  isLogin: React.PropTypes.bool,
  requestAddItemToFavList: React.PropTypes.func,
  requestDeleteItemToFavList: React.PropTypes.func,
  requestTradeItem: React.PropTypes.func,
  requestGetItemDataFromAPI: React.PropTypes.func,
};

PostDetail.defaultProps = {
  id: 0,
  postList: [],
};

function _injectPropsFromStore(state) {
  return {
    postList: state.search.postList,
    isLogin: state.auth.isLogin,
  };
}

const _injectPropsFormActions = {
  requestAddItemToFavList,
  requestDeleteItemToFavList,
  requestTradeItem,
  requestGetItemDataFromAPI,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(PostDetail);
