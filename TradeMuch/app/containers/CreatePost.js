'use strict';

import React, {
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  Component,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Dimensions from 'Dimensions';
import LoadSpinner from 'react-native-loading-spinner-overlay';
import { ImagePickerManager } from 'NativeModules';
import { requestTakePhoto } from '../actions/TakePhotoActions';
import { requestSetLocation } from '../actions/GeoActions';
import {
  requestCreate,
  requestUploadImg,
  requestInputTitle,
  requestInputDescription,
 } from '../actions/PostActions';
import { Actions } from 'react-native-router-flux';
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
    flex: 0.69,
  },
  title: {
    marginTop: 100,
    marginLeft: 20,
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 25,
    textAlign: 'left',
    height: 30,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'stretch',
  },
  itemImg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: windowSize.width,
    height: windowSize.height,
  },
  noneImg: {
    position: 'absolute',
    left: windowSize.width / 2 - 50,
    top: windowSize.width / 2,
    width: 100,
    height: 100,
    borderColor: 'rgba(255, 255, 255, 1)',
  },
  itemDescriptionContainer: {
    marginLeft: 20,
    marginBottom: 15,
  },
  description: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 25,
    marginBottom: 5,
    textAlign: 'left',
    height: 30,
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
  },
  footBackColor: {
    height: windowSize.height,
    width: windowSize.width,
    position: 'absolute',
    bottom: 0,
  },
});


export default class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.selectPhotoButtonHandle = this.selectPhotoButtonHandle.bind(this);
    this.inputTitleHandle = this.inputTitleHandle.bind(this);
    this.postCreateButtonHandle = this.postCreateButtonHandle.bind(this);
    this.inputDescriptionHandle = this.inputDescriptionHandle.bind(this);
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

  selectPhotoButtonHandle() {
    ImagePickerManager.showImagePicker(options, (response) => {
      if (!response.didCancel) {
      //   console.log('User cancelled image picker');
      // } else if (response.error) {
      //   console.log('ImagePickerManager Error: ', response.error);
      // } else if (response.customButton) {
      //   console.log('User tapped custom button: ', response.customButton);
      // } else {
        const source = { uri: response.uri.replace('file://', ''), isStatic: true };
        this.props.requestTakePhoto(source, response);
        const picExtension = response.uri.split('.').pop();
        const picBase64 = `data:image/${picExtension};base64,${response.data}`;
        this.props.requestUploadImg({ picBase64 });
      }
    });
  }

  postCreateButtonHandle() {
    if (this.props.title && this.props.imgSrc[0].src) {
      this.props.requestCreate({
        detail: {
          title: this.props.title,
          description: this.props.description,
          startDate: new Date(),
        },
        location: this.props.location,
        images: this.props.imgSrc[0].src,
      });
    } else {
      Alert.alert('注意', '照片跟標題是必填喔');
    }
  }

  inputTitleHandle(text) {
    this.props.requestInputTitle(text);
  }

  inputDescriptionHandle(text) {
    this.props.requestInputDescription(text);
  }

  render() {
    const { photo, title, description } = this.props;
    if (this.props.postFinishData.id !== null) {
      Actions.postList();
    }
    let backImg;
    if (photo.uri) {
      backImg = [
        <LoadSpinner key="loadSpinner" visible={this.props.imgSrc[0].src === ''} />,
        <Image key="img" source={this.props.photo} style={styles.itemImg} />,
        <LinearGradient
          key="backGround"
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
          style={styles.footBackColor}
        />,
      ];
    } else {
      backImg = [
        <LinearGradient
          key="backGround"
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
          style={styles.footBackColor}
        />,
        <Image
          key="img"
          source={{ uri: 'https://googledrive.com/host/0B-XkApzKpJ7QWHZNeFRXRzNZcHM' }}
          style={styles.noneImg}
        />,
      ];
    }

    return (
      <View style={styles.imageContainer}>
        {backImg}
        <View style={styles.titleContainer}>
          {/*<TouchableOpacity onPress={ this.selectPhotoButtonHandle } >
            <Image source={{uri: 'https://googledrive.com/host/0B-XkApzKpJ7QWHZNeFRXRzNZcHM'}} style={styles.cameraButton}/>
          </TouchableOpacity>*/}
          <TextInput
            style={styles.title}
            placeholder="點擊輸入標題"
            placeholderTextColor="#FFF"
            value={title}
            onChangeText= { this.inputTitleHandle }
          />
        </View>
        <View style={styles.itemDescriptionContainer}>
          <TextInput
            style={styles.description}
            placeholder="點擊輸入描述"
            placeholderTextColor="#FFF"
            value={description}
            onChangeText= { this.inputDescriptionHandle }
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
  };
}

PostDetail.propTypes = {
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  photo: React.PropTypes.object,
  photoInfo: React.PropTypes.object,
  imgSrc: React.PropTypes.array,
  postFinishData: React.PropTypes.object,
  location: React.PropTypes.object,
  requestTakePhoto: React.PropTypes.func,
  requestCreate: React.PropTypes.func,
  requestUploadImg: React.PropTypes.func,
  requestInputTitle: React.PropTypes.func,
  requestInputDescription: React.PropTypes.func,
  requestSetLocation: React.PropTypes.func,
};

PostDetail.defaultProps = {
  title: '',
  description: '',
  photo: {},
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
  requestCreate,
  requestUploadImg,
  requestInputTitle,
  requestInputDescription,
  requestSetLocation,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(PostDetail);
