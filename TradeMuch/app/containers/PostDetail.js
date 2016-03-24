'use strict';

import React, {
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Dimensions from 'Dimensions';
import { ImagePickerManager } from 'NativeModules';
import { requestTakePhoto } from '../actions/TakePhotoActions';
import {
  requestCreate,
  requestUploadImg,
 } from '../actions/PostActions';
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
  cameraButtonContainer: {
    flex: 0.69,
  },
  cameraButton: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    height: 50,
    width: 50,
    marginTop: 50,
    marginLeft: 20,
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
  itemDescriptionContainer: {
    marginLeft: 10,
    marginBottom: 15,
  },
  title: {
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
    borderTopWidth: 2,
    borderColor: '#d6d7da',
  },
  button: {
    height: 50,
    width: 210,
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


function PostDetail(props) {
  function selectPhotoButtonHandle() {
    ImagePickerManager.showImagePicker(options, (response) => {
      if (!response.didCancel) {
      //   console.log('User cancelled image picker');
      // } else if (response.error) {
      //   console.log('ImagePickerManager Error: ', response.error);
      // } else if (response.customButton) {
      //   console.log('User tapped custom button: ', response.customButton);
      // } else {
        const source = { uri: response.uri.replace('file://', ''), isStatic: true };
        props.requestTakePhoto(source, response);
        const picExtension = response.uri.split('.').pop();
        const picBase64 = `data:image/${picExtension};base64,${response.data}`;
        props.requestUploadImg({ picBase64 });
      }
    });
  }

  function postCreateButtonHandle() {
    props.requestCreate({
      detail: {
        title: '123',
        startDate: '2015-12-25',
        endDate: '2015-12-31',
      },
      location: {
        latitude: 24.148657699999998,
        longitude: 120.67413979999999,
      },
      images: '',
    });
  }

  return (
    <View style={styles.imageContainer}>
      <Image source={props.photo} style={styles.itemImg} />
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 1)']}
        style={styles.footBackColor}
      />
      <View style={styles.cameraButtonContainer}>
        <TouchableOpacity style={styles.cameraButton} onPress={ selectPhotoButtonHandle } />
      </View>
      <View style={styles.itemDescriptionContainer}>
        <TextInput
          style={styles.title}
          placeholder="點擊輸入描述"
          placeholderTextColor="#FFF"
        />
      </View>
      <View style={styles.footContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={ postCreateButtonHandle }>發表</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function _injectPropsFromStore(state) {
  return {
    photo: state.takePhoto.photoSource,
    photoInfo: state.takePhoto.photoInfo,
  };
}

PostDetail.propTypes = {
  title: React.PropTypes.string,
  itemName: React.PropTypes.string,
  photo: React.PropTypes.object,
  photoInfo: React.PropTypes.object,
};

PostDetail.defaultProps = {
  title: '',
  itemName: '',
  photo: { uri: 'https://images.unsplash.com/photo-1453053507108-9f5456eb481f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=e0d75a1d1e2605e4c9f9302de0679508' },
  photoInfo: {},
};

const _injectPropsFormActions = {
  requestTakePhoto,
  requestCreate,
  requestUploadImg,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(PostDetail);
