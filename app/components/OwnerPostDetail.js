'use strict';

import React, {
  View,
  Image,
  TouchableOpacity,
  Text,
  Alert,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Dimensions from 'Dimensions';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
const windowSize = Dimensions.get('window');
import { BlurView, VibrancyView } from 'react-native-blur';
import LightBox from 'react-native-lightbox';

const styles = React.StyleSheet.create({
  titleContainer: {
    flex: 0.2,
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
    flex: 0.1,
    padding: 40,
  },
  description: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 18,
    marginBottom: 5,
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
});


// export default function OwnerPostDetail(props) {
export default class OwnerPostDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: '',
      status: '',
    };
  }

  componentDidMount() {
    this.onMount();
  }

  onMount() {
    const id = this.props.id;
    const item = this.findMyItemById(id);
    const requests = item.requests;
    const status = item.status;

    this.setState({
      requests,
      status,
    });
  }

  onTradeClickHandler = () => {
    // if (this.state.status === 'on') {
    // console.log("this.state.status=>",this.state.status);
    switch (this.state.status) {
      default:
        if (this.state.requests === 0) {
          Alert.alert('目前沒有任何人對此物品有興趣:(');
        } else {
          Actions.givePage({
            id: this.props.id,
          });
        }
        break;

      case 'off':
        Alert.alert('已下架');
        break;

      case 'sold':
        Alert.alert('已成交');
        break;
    }
  }

  findMyItemById = (id) => {
    const postList = this.props.myItems;
    let postItem = {};
    for (let i = 0; i < postList.length; i++) {
      if (postList[i].id === id) {
        postItem = postList[i];
      }
    }
    return postItem;
  }

  showRequestCountOnButton = () => {
    let msg = '';
    const itemStatus = this.state.status;
    if (itemStatus === 'sold') {
      msg = '已成交';
    } else if (itemStatus === 'on') {
      msg = `${this.state.requests} 個人想要`;
    } else if (itemStatus === 'off') {
      msg = '已下架';
    }
    return msg;
  }

  render() {
    const { pic, itemTitle, description } = this.props;
    const itemImg = {
      flex: 1,
      width: windowSize.width,
      height: parseInt(windowSize.width / 16.0 * 9.0),
    };
    return (
      <View style={styles.imageContainer}>
        <Image key="img" source={{ uri: pic }} style={styles.itemImg}>
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
        <View style={{flex: 0.3}}>
          <LightBox>
            <Image
              resizeMode="contain"
              source={{ uri: `${pic}` }}
              style={itemImg}
            />
          </LightBox>
        </View>
        <ScrollView style={styles.itemDescriptionContainer}>
          <Text style={styles.description}>{description}</Text>
        </ScrollView>
        <View style={styles.footContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={ this.onTradeClickHandler }
              >
              <Text style={styles.buttonText} >{this.showRequestCountOnButton()}</Text>
            </TouchableOpacity>
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
}

OwnerPostDetail.propTypes = {
  itemTitle: React.PropTypes.string,
  description: React.PropTypes.string,
  pic: React.PropTypes.string,
  id: React.PropTypes.number,
  myItems: React.PropTypes.array,
};

OwnerPostDetail.defaultProps = {
  itemTitle: '',
  description: '',
  pic: {},
  id: 0,
  myItems: {},
};

function _injectPropsFromStore(state) {
  return {
    myItems: state.post.myItems,
  };
}

const _injectPropsFormActions = {};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(OwnerPostDetail);
