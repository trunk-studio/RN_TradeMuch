import React, {
  NativeModules,
  TouchableOpacity,
  View,
  Component,
  ListView,
  Alert,
  PixelRatio,
  Text,
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import * as color from '../style/color';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
// import ListItem from '../components/PostList/ListItem';
// import config from '../config/index';
import ActionButton from '../components/ActionButton';
import CheckBox from 'react-native-icon-checkbox';
import Dimensions from 'Dimensions';
const windowSize = Dimensions.get('window');
const PIXEL_RATIO = PixelRatio.get();

const {
  RNSearchBarManager,
} = NativeModules;
import {
  requestSearchLoadMore,
  requestSearchPost,
  requestSearchPostNextPage,
} from '../actions/SearchPostActions';
import { requestSetLocation } from '../actions/GeoActions';

console.log("color=>",color);

const styles = React.StyleSheet.create({
  content: {
    backgroundColor: color.LIST_BACKGROUND_COLOR_1,
    flex: 1,
    width: windowSize.width,
    // marginTop: 20,
    alignItems: 'center',
    paddingTop: 20,
  },
  contentInner: {
    width: windowSize.width * 0.9,
    borderWidth: 0.5,
    borderColor: 'rgb(173, 189, 185)',
  },
  menuItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  itemInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftBlock: {
    flex: 0.5,
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  rightBlock: {
    flex: 0.5,
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  checkBoxContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
  checkBox: {
    color: '#000',
    fontSize: 7 * PIXEL_RATIO,
  },
});


export default class PostList extends Component {
  constructor(props) {
    super(props);
    this.getListItem = this.getListItem.bind(this);
    const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource,
      showsCancelButton: false,
    };
  }
  componentDidMount() {
    const tradeRecord = [
      {
        id: 0,
        title: 'ALL 都想要',
      },
      {
        id: 1,
        title: '保養品',
      },
      {
        id: 2,
        title: '3C 產品',
      },
      {
        id: 3,
        title: '居家用品',
      },
      {
        id: 4,
        title: '生活家電',
      },
      {
        id: 5,
        title: '運動用品',
      },
    ];

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(tradeRecord),
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.postList !== this.props.postList) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.postList),
      });
    }
  }

  onChangeText = (value) => {
    const { location } = this.props;
    this.props.requestSearchLoadMore(false);
    this.props.requestSearchPost(value, '60000km', {
      lat: location.latitude,
      lon: location.longitude,
    }, this.props.postList.length);
  }

  onListItemPress = (id) => {
    // this.handleSearchCancelPress();
    // Actions.postDetail({ id });
    Alert.alert('測試資料!');
  }

  onItemPress = () => {
    
  }

  getListItem(rowData, sectionID, rowID, highlightRow) {
    let bakColor = {};
    if (rowID % 2 === 0) {
      bakColor = { backgroundColor: color.LIST_ITEM_COLOR1 };
    } else {
      bakColor = { backgroundColor: color.LIST_ITEM_COLOR2 };
    }
    let distance = '';
    if (rowData.distance !== -1) {
      if (rowData.distance <= 1) {
        distance = `${rowData.distance * 1000} m`;
      } else {
        distance = `${rowData.distance} km`;
      }
    }
    return (
      <TouchableOpacity
        style={[styles.menuItem, bakColor]}
        onPress={this.onItemPress}
      >
        <View style={styles.itemInner}>
          <View style={styles.leftBlock}>
            <Text>{rowData.title}</Text>
          </View>
          <View style={styles.rightBlock}>
            <CheckBox
              id={rowData.id}
              label=""
              size={30}
              checked={this.state.isAgreePolicies}
              onPress={this.handleCheck}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  handleSearchButtonPress = () => {
    this.searchBarDissmissKeyBoard();
  }

  searchBarDissmissKeyBoard = () => {
    RNSearchBarManager.blur(React.findNodeHandle(this.refs.postSearchBar));
  }

  loadMorePost = () => {
    const { postList, lastSeachApi } = this.props;
    this.props.requestSearchLoadMore(false);
    this.props.requestSearchPostNextPage(lastSeachApi, postList.length);
  }

  handleSearchCancelPress = () => {
    this.searchBarDissmissKeyBoard();
    this.setState({ showsCancelButton: false });
  }

  handleSearchBarOnFocus = () => {
    this.setState({ showsCancelButton: true });
  }

  handleActionButtonPress = () => {
    Actions.createPost.call();
  }

  render() {
    return (
      <View style={styles.content}>
        <View style={styles.contentInner}>
          <ListView
            keyboardDismissMode="on-drag"
            renderScrollComponent={props => <InfiniteScrollView {...props} />}
            dataSource={this.state.dataSource}
            renderRow={this.getListItem}
            onLoadMoreAsync={this.loadMorePost}
            canLoadMore={this.props.canLoadMore}
          />
        </View>
    </View>
    );
  }
}

PostList.propTypes = {
  postList: React.PropTypes.array,
  location: React.PropTypes.object,
  lastSeachApi: React.PropTypes.string,
  canLoadMore: React.PropTypes.bool,
  requestSearchLoadMore: React.PropTypes.func,
  requestSearchPost: React.PropTypes.func,
  onListItemPress: React.PropTypes.func,
  requestSetLocation: React.PropTypes.func,
  requestSearchPostNextPage: React.PropTypes.func,
};

PostList.defaultProps = {
  postList: [],
  location: {
    latitude: 24.148657699999998,
    longitude: 120.67413979999999,
  },
  canLoadMore: true,
};

function _injectPropsFromStore(state) {
  return {
    postList: state.search.postList,
    lastSeachApi: state.search.lastSeachApi,
    canLoadMore: state.search.canLoadMore,
    location: state.geo.location,
  };
}

const _injectPropsFormActions = {
  requestSearchLoadMore,
  requestSearchPost,
  requestSetLocation,
  requestSearchPostNextPage,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(PostList);
