import React, {
  NativeModules,
  Dimensions,
  View,
  Component,
  ListView,
  Alert,
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import {
  LIST_ITEM_COLOR1,
  LIST_ITEM_COLOR2,
  SEARCHBAR_COLOR,
  WHITE_COLOR,
 } from '../style/color';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ListItem from '../components/PostList/ListItem';
import ActionButton from './ActionButton';
import config from '../config/index';
// import SearchBar from '../components/SearchBar';
import SearchBar from 'react-native-search-bar';
import TMListView from './TMListView';

const {
  RNSearchBarManager,
} = NativeModules;

import {
  requestSearchLoadMore,
  requestSearchPost,
  requestSearchPostNextPage,
} from '../actions/SearchPostActions';
import { requestSetLocation } from '../actions/GeoActions';
import MultilineRadio from '../components/MultilineRadio';

const windowSize = Dimensions.get('window');
const styles = React.StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 20,
    backgroundColor: WHITE_COLOR,
    paddingBottom: windowSize.height * 0.11,
  },
});


export default class Category extends Component {
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
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.props.requestSetLocation(position);
        this.props.requestSearchLoadMore(false);
        this.props.requestSearchPost(null, '300km', {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.Category !== this.props.Category) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.Category),
      });
    }
  }

  onChangeText = (value) => {
    const { location } = this.props;
    this.props.requestSearchLoadMore(false);
    this.props.requestSearchPost(value, '60000km', {
      lat: location.latitude,
      lon: location.longitude,
    }, this.props.Category.length);
  }

  onListItemPress = (id) => {
    // this.handleSearchCancelPress();
    // Actions.postDetail({ id });
    Alert.alert('測試資料!');
  }

  getListItem(rowData, sectionID, rowID, highlightRow) {
    let bakColor = {};
    if (rowID % 2 === 0) {
      bakColor = { backgroundColor: LIST_ITEM_COLOR1 };
    } else {
      bakColor = { backgroundColor: LIST_ITEM_COLOR2 };
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
      <ListItem
        id={rowData.id}
        index={rowData.index}
        title={rowData.title}
        img={`${config.serverDomain}${rowData.pic}`}
        description={distance}
        onItemPress={this.onListItemPress}
        bakColor={bakColor}
        rightText={''}
      />
    );
  }

  handleSearchButtonPress = () => {
    this.searchBarDissmissKeyBoard();
  }

  searchBarDissmissKeyBoard = () => {
    RNSearchBarManager.blur(React.findNodeHandle(this.refs.postSearchBar));
  }

  loadMorePost = () => {
    const { Category, lastSeachApi } = this.props;
    this.props.requestSearchLoadMore(false);
    this.props.requestSearchPostNextPage(lastSeachApi, Category.length);
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

  categoryItemPress = () => {
    Alert.alert('click1');
  }

  categoryArray() {
    return [
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
      {
        id: 6,
        title: '課本講義',
      },
    ];
  }

  render() {
    return (
      <View style={styles.content}>
        <MultilineRadio
          options={this.categoryArray()}
          onListItemPress={this.categoryItemPress}
        />
        {/*<ListView
          keyboardDismissMode="on-drag"
          renderScrollComponent={props => <InfiniteScrollView {...props} />}
          dataSource={this.state.dataSource}
          renderRow={this.getListItem}
          onLoadMoreAsync={this.loadMorePost}
          canLoadMore={this.props.canLoadMore}
        />*/}
        <ActionButton
          text="GO!尋寶去"
          img="http://qa.trademuch.co.uk/img/add.png"
          onPress={this.handleActionButtonPress}
        />
    </View>
    );
  }
}

Category.propTypes = {
  Category: React.PropTypes.array,
  location: React.PropTypes.object,
  lastSeachApi: React.PropTypes.string,
  canLoadMore: React.PropTypes.bool,
  requestSearchLoadMore: React.PropTypes.func,
  requestSearchPost: React.PropTypes.func,
  onListItemPress: React.PropTypes.func,
  requestSetLocation: React.PropTypes.func,
  requestSearchPostNextPage: React.PropTypes.func,
};

Category.defaultProps = {
  Category: [],
  location: {
    latitude: 24.148657699999998,
    longitude: 120.67413979999999,
  },
  canLoadMore: true,
};

function _injectPropsFromStore(state) {
  return {
    Category: state.search.Category,
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

export default connect(_injectPropsFromStore, _injectPropsFormActions)(Category);
