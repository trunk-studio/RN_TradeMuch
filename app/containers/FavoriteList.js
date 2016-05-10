import React, {
  NativeModules,
  ScrollView,
  View,
  Component,
  ListView,
  Alert,
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import { LIST_ITEM_COLOR1, LIST_ITEM_COLOR2 } from '../style/color';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ListItem from '../components/PostList/ListItem';
import ActionButton from './ActionButton';
import TMListView from './TMListView';
import {
  calcDistance,
  formatDistance,
} from '../utils/place';
import Swipeout from 'react-native-swipeout';
import SwipeOutButton from '../components/SwipeOutButton';
import * as color from '../style/color';

const {
  RNSearchBarManager,
} = NativeModules;

import {
  requestSearchLoadMore,
  requestSearchPost,
  requestSearchPostNextPage,
} from '../actions/SearchPostActions';

import {
  requestGetFavoriteList,
  requestDeleteFavorite,
} from '../actions/FavoriteActions';

import { requestSetLocation } from '../actions/GeoActions';
import config from '../config/index';

const styles = React.StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#fff',
  },
  ButtomButton: {

  },
});


export default class PostList extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource,
      showsCancelButton: false,
    };
  }

  componentWillMount() {
    this.props.requestGetFavoriteList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.favoriteList !== this.props.favoriteList) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.favoriteList),
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
    Actions.postDetail({ id });
  }

  getListItem = (rowData, sectionID, rowID) => {
    if (rowData) {
      let bakColor = {};
      if (rowID % 2 === 0) {
        bakColor = { backgroundColor: LIST_ITEM_COLOR1 };
      } else {
        bakColor = { backgroundColor: LIST_ITEM_COLOR2 };
      }
      let desc = '';
      let distance = calcDistance(this.props.location.latitude, this.props.location.longitude, rowData.place.latitude, rowData.place.longitude).toString();
      desc = formatDistance(distance);
      const swipeoutBtns = [
        {
          backgroundColor: color.SWIPE_BUTTON_COLOR_3,
          onPress: this.deleteFavoriteItem.bind(this, rowData.id),
          component: (
            <SwipeOutButton label={"刪除"} imgSource={{ uri: 'http://i.imgur.com/cxvFxzn.png' }} />
          ),
        },
      ];
      let rightText = '';
      if (rowData.status === 'off') {
        rightText = '已下架';
      } else if (rowData.status === 'sold') {
        rightText = '已成交';
      }
      return (
        <Swipeout
          right={swipeoutBtns}
          autoClose
        >
          <ListItem
            id={rowData.id}
            index={rowData.index}
            title={rowData.title}
            img={`${config.serverDomain}${rowData.coverImage}`}
            description={desc}
            onItemPress={this.onListItemPress}
            bakColor={bakColor}
            rightText={rightText}
            rightTextStyle={{
              color: color.TEXT_PRIMARY_COLOR,
              fontWeight: 'bold',
              fontSize: 12,
            }}
          />
      </Swipeout>
      );
    }
    return (null);
  }

  deleteFavoriteItem = (id) => {
    this.props.requestDeleteFavorite(id);
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
        <TMListView
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
  requestGetFavoriteList: React.PropTypes.func,
  requestDeleteFavorite: React.PropTypes.func,
  favoriteList: React.PropTypes.array,
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
    favoriteList: state.favorite.list,
  };
}

const _injectPropsFormActions = {
  requestSearchLoadMore,
  requestSearchPost,
  requestSetLocation,
  requestSearchPostNextPage,
  requestGetFavoriteList,
  requestDeleteFavorite,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(PostList);
