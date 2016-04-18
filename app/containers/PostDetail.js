import React, {
  View,
  Image,
  TouchableOpacity,
  Text,
  Component,
  Linking,
  PixelRatio,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import config from '../config/index';
import LinearGradient from 'react-native-linear-gradient';
import Dimensions from 'Dimensions';
import {
  requestAddItemToFavList,
  requestDeleteItemToFavList,
} from '../actions/PostDetailActions';
import { Actions } from 'react-native-router-flux';

const windowSize = Dimensions.get('window');
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
    justifyContent: 'flex-end',
    flex: 0.5,
  },
  description: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 23,
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
    fontSize: 18,
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
    flex: 0.5,
    flexDirection: 'row',
  },
  openChatRoomText: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 5 * PIXEL_RATIO,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 3 * PIXEL_RATIO,
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
    this.postItem = this.findPostItemById();
  }

  getItNowButtonHandle = () => {
    if (this.props.isLogin) {
      Actions.messenger({
        title: this.postItem.title,
        postId: this.props.id,
        sendMessageInitial: `嗨！我想要${this.postItem.title}`,
      });
    } else {
      this.pleaseLogin();
    }
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
        title: this.postItem.title,
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
    const lon = this.postItem.location.lon;
    const lat = this.postItem.location.lat;
    const url = `https://www.google.com.tw/maps/place/${lat},${lon}`;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  }

  findPostItemById = () => {
    const postList = this.props.postList;
    let postItem = {};
    for (let i = 0; i < postList.length; i++) {
      if (postList[i].id === this.props.id) {
        postItem = postList[i];
      }
    }
    return postItem;
  }

  render() {
    // console.log("this.postItem=>",this.postItem);
    const { title, description, pic, isFav } = this.postItem;
    if (title === null) {
      Actions.postList.call();
    }

    let favButton = [];
    if (isFav === false) {
      favButton = [
        <TouchableOpacity
          key="favButton"
          style={styles.button}
          onPress={ this.addItemToFavoriteButtonHandle }
        >
          <Text style={styles.buttonText} >追蹤</Text>
        </TouchableOpacity>,
      ];
    } else if (isFav === true) {
      favButton = [
        <TouchableOpacity
          key="favButton"
          style={styles.button}
          onPress={ this.deleteFavoriteItemButtonHandle }
        >
          <Text style={styles.buttonText} >取消追蹤</Text>
        </TouchableOpacity>,
      ];
    }

    return (
      <View style={styles.imageContainer}>
        <Image source={{ uri: `${config.serverDomain}/${pic}` }} style={styles.itemImg} />
        <LinearGradient
          key="backGround"
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
          style={styles.footBackColor}
        />
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>
        <View style={styles.buttonChatContainer}>
          <TouchableOpacity
            style={styles.openChatRoomButton}
            onPress={ this.openChatRoomButtonHandle }
          >
            <Text style={styles.openChatRoomText} >對話</Text>
          </TouchableOpacity>
        </View>
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
          </View>
        </View>
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
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(PostDetail);
