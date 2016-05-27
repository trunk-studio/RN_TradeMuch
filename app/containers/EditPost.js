'use strict';

import React, {
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  Component,
  Alert,
  NetInfo,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Dimensions from 'Dimensions';
import LoadSpinner from 'react-native-loading-spinner-overlay';
import NetworkStatusBar from '../components/NetworkNotify/NetworkStatusBar';
import config from '../config/index';
import { ImagePickerManager } from 'NativeModules';
import Icon from 'react-native-vector-icons/FontAwesome';
import { requestTakePhoto } from '../actions/TakePhotoActions';
import { requestSetLocation } from '../actions/GeoActions';
import { BlurView } from 'react-native-blur';
import {
  requestGetItemDataFromAPI,
} from '../actions/PostDetailActions';

import {
  requestEdit,
  requestUploadImg,
  requestInputTitle,
  requestInputDescription,
  requestCleanCreatePostData,
  requestClearUpdatedStatus,
 } from '../actions/PostActions';
import { Actions } from 'react-native-router-flux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import MaskView from './MaskView';

const windowSize = Dimensions.get('window');

const options = {
  title: '選擇照片', // specify null or empty string to remove the title
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: '從相簿中選擇', // specify null or empty string to remove this button
  cameraType: 'back', // 'front' or 'back'
  mediaType: 'photo', // 'photo' or 'video'
  videoQuality: 'high', // 'low', 'medium', or 'high'
  durationLimit: 10, // video recording max time in seconds
  maxWidth: 800, // photos only
  maxHeight: 800, // photos only
  quality: 0.8, // 0 to 1, photos only
  allowsEditing: false, // Built in functionality to resize/reposition the image after selection
  noData: false,
  // photos only - disables the base64 `data` field from being generated
  // (greatly improves performance on large photos)
  storageOptions: {
  // if this key is provided, the image will get saved in the documents
  // directory on ios, and the pictures directory on android (rather than a temporary directory)
    skipBackup: true, // ios only - image will NOT be backed up to icloud
    path: 'images',
    // ios only - will save image at /Documents/images rather than the root
  },
};


const styles = React.StyleSheet.create({
  titleContainer: {
    flex: 0.1,
    marginBottom: 60,
  },
  titlePosition: {
    marginTop: 65,
    marginLeft: 20,
    flexDirection: 'row',
  },
  title: {
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'rgba(255, 255, 255, 1)',
    marginLeft: 10,
    fontSize: 25,
    textAlign: 'left',
    height: 30,
    width: windowSize.width - 50,
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 1 },
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  itemImg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: windowSize.width,
    height: windowSize.height,
  },
  noneImgContainer: {
    // position: 'absolute',
    // left: windowSize.width / 2 - 50,
    // top: windowSize.width / 2,
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
  },
  noneImg: {
    width: 100,
    height: 100,
    borderColor: 'rgba(255, 255, 255, 1)',
  },
  itemDescriptionContainer: {
    marginLeft: 20,
    marginBottom: 15,
    flexDirection: 'row',
  },
  description: {
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 25,
    marginTop: -8,
    marginLeft: 10,
    marginBottom: 5,
    textAlign: 'left',
    // height: 30,
    width: windowSize.width - 40,
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 1 },
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    height: 90,
  },
  price: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 25,
    textAlign: 'right',
    marginRight: 10,
    bottom: -29,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    margin: 20,
    height: 50,
    backgroundColor: 'rgba(74, 74, 74, 0.3)',
    borderRadius: 9,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 18,
  },
  footContainer: {
    flex: 0.21,
    alignSelf: 'stretch',
  },
  footBackColor1: {
    height: windowSize.height / 3,
    width: windowSize.width,
    position: 'absolute',
    bottom: 0,
  },
  footBackColor2: {
    height: windowSize.height,
    width: windowSize.width,
    position: 'absolute',
    bottom: 0,
  },
  mainItemImg: {
    flex: 1,
    width: windowSize.width,
    height: parseInt(windowSize.width / 16.0 * 9.0),
    marginBottom: 40,
  },
});


export default class EditPost extends Component {
  constructor(props) {
    super(props);
    this.selectPhotoButtonHandle = this.selectPhotoButtonHandle.bind(this);
    this.postCreateButtonHandle = this.postCreateButtonHandle.bind(this);
    this.inputDescriptionHandle = this.inputDescriptionHandle.bind(this);
    this.state = {
      title: '',
      description: '',
      showLoadingIndicator: false,
      showNonImage: true,
      postItem: null,
    };
  }

  componentWillMount() {
    const postItem = this.findPostItemById();
    console.log(this.props);
    this.setState({
      postItem,
      title: postItem.title,
      description: postItem.description,
    });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.props.requestSetLocation(position);
      },
      (error) => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  componentWillReceiveProps(nextProps) {
    const { postFinishData } = nextProps;
    if (nextProps.updatedSuccess) {
      // Actions.postDetail({id: this.props.postItem.id});
      this.props.requestClearUpdatedStatus();
      Actions.createFinish({
        id: this.state.postItem.id,
        itemTitle: this.state.postItem.title,
        description: this.state.postItem.description,
        pic: config.serverDomain + '/' + (this.props.imgSrc[0].src.length > 0 ? this.props.imgSrc[0].src : this.state.postItem.pic),
        from: 'myItems',
      });
      this.setState({
        showLoadingIndicator: false,
      });
    }
  }

  componentWillUnmount() {
    this.props.requestCleanCreatePostData();
    this.props.requestClearUpdatedStatus();
  }


  selectPhotoButtonHandle() {
    ImagePickerManager.showImagePicker(options, (response) => {
      if (!response.didCancel) {
      //   console.log('User cancelled image picker');
      // } else if (response.error) {
      //   console.log('ImagePickerManager Error: ', response.error);
      // } else if (response.customButton) {
      //   console.log('User tapped custom button: ', response.customButton);
      // } else {
        NetInfo.isConnected.fetch().done((isConnected) => {
          if (isConnected) {
            const source = { uri: response.uri.replace('file://', ''), isStatic: true };
            this.props.requestTakePhoto(source, response);
            const picExtension = response.uri.split('.').pop();
            const picBase64 = `data:image/${picExtension};base64,${response.data}`;
            this.props.requestUploadImg({ picBase64 });
          } else {
            Alert.alert('注意', '需連線至網路');
          }
        });
      }
    });
  }

  postCreateButtonHandle() {
    if (!this.state.showLoadingIndicator) {
      let closeLoading;
      // closeLoading = setTimeout(() => {
      //   this.setState({
      //     showLoadingIndicator: true,
      //   });
      // }, 5000);
      if (this.state.title && (this.props.imgSrc[0].src || this.state.postItem.pic)) {
        this.props.requestInputTitle(this.state.title);
        this.props.requestInputDescription(this.state.description);
        this.props.requestEdit(this.props.id, {
          detail: {
            title: this.state.title,
            description: this.state.description,
            startDate: new Date(),
          },
          location: this.props.location,
          images: this.props.imgSrc[0].src.length > 0 ? this.props.imgSrc[0].src : this.state.postItem.pic,
        });
        // clearTimeout(closeLoading);
        this.setState({
          showLoadingIndicator: true,
        });
      } else {
        Alert.alert('注意', '照片跟標題是必填喔');
      }
    }
  }

  inputTitleHandle = (text) => {
    this.setState({
      title: text,
    });
  }

  inputTitleOnEndHandle = () => {
    this.props.requestInputTitle(this.state.title);
  }

  inputDescriptionHandle(text) {
    this.setState({
      description: text,
    });
  }
  inputDescriptionOnEndHandle = () => {
    this.props.requestInputDescription(this.state.description);
  }

  onKeyboardToggle = (willOpen, height) => {
    this.setState({
      showNonImage: !willOpen,
    });
  }

  findPostItemById = () => {
    const postList = this.props.myItems;
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
    // console.log('state', this.state.postItem);
    const { pic, title, description } = this.state.postItem;
    const imgSrc = (this.props.photo && this.props.photo.uri) ? this.props.photo : { uri: `${config.serverDomain}/${pic}` };
    let backImg;
    let noneImg = null;
    if (pic) {
      backImg = [
        // <LoadSpinner
        //   key="loadSpinner"
        //   visible={this.props.imgSrc[0].src === '' && postFinishData.id === null }
        // />,
        <Image key="img" source={imgSrc} style={styles.itemImg} >
          <BlurView blurType="light" style={styles.itemImg} />
        </Image>,
        <LinearGradient
          key="backGround"
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
          style={styles.footBackColor1}
        />,
      ];
      if (this.state.showNonImage) {
        noneImg = (
          <TouchableOpacity
            onPress={ this.selectPhotoButtonHandle }
          >
            <Image
              resizeMode="contain"
              source={imgSrc}
              style={styles.mainItemImg}
            />
          </TouchableOpacity>
        );
      }
    } else {
      backImg = [
        <LinearGradient
          key="backGround"
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
          style={styles.footBackColor2}
        />,
      ];
      if (this.state.showNonImage) {
        noneImg = (
          <TouchableOpacity
            key="cameraBtn"
            style={styles.noneImgContainer}
            onPress={ this.selectPhotoButtonHandle }
          >
            <Image
              key="img"
              source={{ uri: 'https://googledrive.com/host/0B-XkApzKpJ7QWHZNeFRXRzNZcHM' }}
              style={styles.noneImg}
            />
          </TouchableOpacity>
        );
      } else {
        noneImg = null;
      }
    }

    return (
      <View style={ { flex: 1 } }>
        <LoadSpinner
          key="loadSpinner"
          visible={this.state.showLoadingIndicator}
        />
        <View style={styles.imageContainer}>
          {backImg}
          <View style={styles.titleContainer}>
            <View style={styles.titlePosition}>
              <Icon
                name="pencil"
                size={25}
                color={'rgba(255, 255, 255, 0.8)'}
              />
              <TextInput
                style={styles.title}
                placeholder="點擊輸入標題"
                placeholderTextColor="#FFF"
                defaultValue={title}
                onChangeText= { this.inputTitleHandle }
                onEndEditing= { this.inputTitleOnEndHandle }
                returnKeyType={'done'}
              />
            </View>
          </View>
          {noneImg}
          <View style={styles.itemDescriptionContainer}>
            <Icon
              name="file-text-o"
              size={25}
              color={'rgba(255, 255, 255, 0.8)'}
            />
            <TextInput
              multiline
              style={styles.description}
              placeholder="點擊輸入描述"
              placeholderTextColor="#FFF"
              defaultValue={description}
              onChangeText= { this.inputDescriptionHandle }
              onEndEditing= { this.inputDescriptionOnEndHandle }
            />
          </View>
          <View style={styles.footContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={ Actions.postList }
              >
                <Text style={styles.buttonText} >取消</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={ this.postCreateButtonHandle }
              >
                <Text style={styles.buttonText} >完成</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={ this.selectPhotoButtonHandle }
              >
                <Text style={styles.buttonText} >拍照</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <NetworkStatusBar top={20} />
        <KeyboardSpacer onToggle={this.onKeyboardToggle} />
        <MaskView />
      </View>
    );
  }
}

function _injectPropsFromStore(state) {
  return {
    title: state.post.title,
    description: state.post.description,
    photo: state.takePhoto.photoSource,
    photoInfo: state.takePhoto.photoInfo,
    imgSrc: state.post.upLoadImg,
    postFinishData: state.post.postFinishData,
    location: state.geo.location,
    myItems: state.post.myItems,
    updatedSuccess: state.post.updatedSuccess,
  };
}

EditPost.propTypes = {
  id: React.PropTypes.number,
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  photo: React.PropTypes.object,
  photoInfo: React.PropTypes.object,
  imgSrc: React.PropTypes.array,
  postFinishData: React.PropTypes.object,
  location: React.PropTypes.object,
  requestTakePhoto: React.PropTypes.func,
  requestEdit: React.PropTypes.func,
  requestUploadImg: React.PropTypes.func,
  requestInputTitle: React.PropTypes.func,
  requestInputDescription: React.PropTypes.func,
  requestSetLocation: React.PropTypes.func,
  requestCleanCreatePostData: React.PropTypes.func,
  requestGetItemDataFromAPI: React.PropTypes.func,
  requestClearUpdatedStatus: React.PropTypes.func,
  myItems: React.PropTypes.array,
  updatedSuccess: React.PropTypes.bool,
};

EditPost.defaultProps = {
  title: '',
  description: '',
  photo: null,
  photoInfo: {},
  location: {
    latitude: 24.148657699999998,
    longitude: 120.67413979999999,
  },
  imgSrc: [{ name: '', src: '' }],
  postFinishData: { id: null, uuid: '', title: '', startDate: '', user_id: null, UserId: null },
};

const _injectPropsFormActions = {
  requestTakePhoto,
  requestEdit,
  requestUploadImg,
  requestInputTitle,
  requestInputDescription,
  requestSetLocation,
  requestCleanCreatePostData,
  requestGetItemDataFromAPI,
  requestClearUpdatedStatus,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(EditPost);
