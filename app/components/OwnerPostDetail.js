'use strict';

import React, {
  View,
  Image,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Dimensions from 'Dimensions';
import { Actions } from 'react-native-router-flux';
const windowSize = Dimensions.get('window');

const styles = React.StyleSheet.create({
  titleContainer: {
    flex: 0.69,
  },
  title: {
    marginTop: 65,
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
    margin: 100,
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


export default function OwnerPostDetail(props) {
  const { pic, itemTitle, description, requests, id } = props;

  function onTradeClickHandler() {
    if (requests === 0) {
      Alert.alert('目前沒有任何人對此物品有興趣');
    } else {
      Actions.givePage({
        id,
      });
    }
  }


  return (
    <View style={styles.imageContainer}>
      <Image key="img" source={{ uri: pic }} style={styles.itemImg} />
      <LinearGradient
        key="backGround"
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
        style={styles.footBackColor}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{itemTitle}</Text>
      </View>
      <View style={styles.itemDescriptionContainer}>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.footContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={ onTradeClickHandler }
          >
            <Text style={styles.buttonText} >{requests} 個請求</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={ Actions.pop }
          >
            <Text style={styles.buttonText} >完成</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

OwnerPostDetail.propTypes = {
  itemTitle: React.PropTypes.string,
  description: React.PropTypes.string,
  pic: React.PropTypes.string,
  id: React.PropTypes.number,
  requests: React.PropTypes.number,
};

OwnerPostDetail.defaultProps = {
  itemTitle: '',
  description: '',
  pic: {},
  id: 0,
  requests: 0,
};
