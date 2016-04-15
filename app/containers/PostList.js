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
import ActionButton from '../components/ActionButton';
import config from '../config/index';
// import SearchBar from '../components/SearchBar';
import SearchBar from 'react-native-search-bar';
const {
  RNSearchBarManager,
} = NativeModules;
import {
  requestSearchLoadMore,
  requestSearchPost,
  requestSearchPostNextPage,
} from '../actions/SearchPostActions';
import { requestSetLocation } from '../actions/GeoActions';

const windowSize = Dimensions.get('window');
const styles = React.StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 20,
    backgroundColor: WHITE_COLOR,
    paddingBottom: windowSize.height * 0.11,
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
    this.handleSearchCancelPress();
    Actions.postDetail({ id });
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
        <SearchBar
          ref="postSearchBar"
          onBlur={this.handleSearchCancelPress}
          onFocus={this.handleSearchBarOnFocus}
          onChangeText={this.onChangeText}
          onSearchButtonPress={this.handleSearchButtonPress}
          onCancelButtonPress={this.handleSearchCancelPress}
          showsCancelButton={this.state.showsCancelButton}
          barTintColor={SEARCHBAR_COLOR}
          searchBarStyle="default"
        />
        <ListView
          keyboardDismissMode="on-drag"
          renderScrollComponent={props => <InfiniteScrollView {...props} />}
          dataSource={this.state.dataSource}
          renderRow={this.getListItem}
          onLoadMoreAsync={this.loadMorePost}
          canLoadMore={this.props.canLoadMore}
        />
        <ActionButton
          text="我要上架"
          img="http://qa.trademuch.co.uk/img/add.png"
          onPress={this.handleActionButtonPress}
        />
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
