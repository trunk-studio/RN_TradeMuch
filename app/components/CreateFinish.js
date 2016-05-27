'use strict';

import React, {
  View,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Dimensions from 'Dimensions';
import { Actions } from 'react-native-router-flux';
import { ShareDialog } from 'react-native-fbsdk';
import { BlurView } from 'react-native-blur';
import LightBox from 'react-native-lightbox';

const windowSize = Dimensions.get('window');

const styles = React.StyleSheet.create({
  titleContainer: {
    flex: 0.1,
    marginBottom: 60,
  },
  title: {
    marginTop: 65,
    marginLeft: 20,
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 25,
    textAlign: 'left',
    height: 30,
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
    height: windowSize.height / 3,
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


export default function CreateFinish(props) {
  const { pic, itemTitle, description, id } = props;
  function finishBtn() {
    if (props.from === 'myItems') {
      Actions.myItems();
    } else {
      Actions.postList({
        type: 'reset',
      });
    }
  }
  function selectCategoryBtn() {
    Actions.createCategory({ id });
  }
  function openShareButtonHandle() {
    const shareInfo = {
      contentType: 'link',
      contentUrl: `http://qa.trademuch.co.uk/app/post/${id}`,
      contentDescription: `我在 TradeMuch 發佈了一個${itemTitle}不錯喔!!`,
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
  console.log('=-----pic', pic);
  return (
    <View style={styles.imageContainer}>
      <Image key="img" source={{ uri: pic }} style={styles.itemImg} >
        <BlurView blurType="light" style={styles.itemImg} />
      </Image>
      <LinearGradient
        key="backGround"
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
        style={styles.footBackColor}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{itemTitle}</Text>
      </View>
      <LightBox>
        <Image
          resizeMode="contain"
          source={{ uri: pic }}
          style={styles.mainItemImg}
        />
      </LightBox>
      <View style={styles.itemDescriptionContainer}>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.footContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={ selectCategoryBtn }
          >
            <Text style={styles.buttonText} >新增分類</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={ finishBtn }
          >
            <Text style={styles.buttonText} >完成</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={ openShareButtonHandle }
          >
            <Text style={styles.buttonText} >分享</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

CreateFinish.propTypes = {
  id: React.PropTypes.number.isRequired,
  itemTitle: React.PropTypes.string,
  description: React.PropTypes.string,
  pic: React.PropTypes.string,
  from: React.PropTypes.string,
};

CreateFinish.defaultProps = {
  itemTitle: '',
  description: '',
  pic: {},
};
