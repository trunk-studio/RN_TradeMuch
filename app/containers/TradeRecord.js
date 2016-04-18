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
import ActionButton from '../components/ActionButton';
// import config from '../config/index';

const {
  RNSearchBarManager,
} = NativeModules;
import {
  requestSearchLoadMore,
  requestSearchPost,
  requestSearchPostNextPage,
} from '../actions/SearchPostActions';
import { requestSetLocation } from '../actions/GeoActions';

const styles = React.StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#fff',
  },
  ButtomButton: {

  },
});


export default class TradeRecord extends Component {
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
        id: 1,
        title: '韓國進口茶包',
        pic: 'http://i.imgur.com/8LadPEI.jpg',
        rightText: '已成交',
        distance: 0.232,
      },
      {
        id: 2,
        title: '流行手提包',
        pic: 'http://i.imgur.com/6fLGRMu.jpg',
        rightText: '拒絕',
        distance: 0.300,
      },
      {
        id: 3,
        title: '全新馬克杯',
        pic: 'http://i.imgur.com/Nww6aKU.jpg',
        rightText: '',
        distance: 0.350,
      },
    ];

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(tradeRecord),
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.TradeRecord !== this.props.TradeRecord) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.TradeRecord),
      });
    }
  }

  onChangeText = (value) => {
    const { location } = this.props;
    this.props.requestSearchLoadMore(false);
    this.props.requestSearchPost(value, '60000km', {
      lat: location.latitude,
      lon: location.longitude,
    }, this.props.TradeRecord.length);
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
        img={rowData.pic}
        description={distance}
        onItemPress={this.onListItemPress}
        bakColor={bakColor}
        rightText={rowData.rightText}
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
    const { TradeRecord, lastSeachApi } = this.props;
    this.props.requestSearchLoadMore(false);
    this.props.requestSearchPostNextPage(lastSeachApi, TradeRecord.length);
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

TradeRecord.propTypes = {
  TradeRecord: React.PropTypes.array,
  location: React.PropTypes.object,
  lastSeachApi: React.PropTypes.string,
  canLoadMore: React.PropTypes.bool,
  requestSearchLoadMore: React.PropTypes.func,
  requestSearchPost: React.PropTypes.func,
  onListItemPress: React.PropTypes.func,
  requestSetLocation: React.PropTypes.func,
  requestSearchPostNextPage: React.PropTypes.func,
};

TradeRecord.defaultProps = {
  TradeRecord: [],
  location: {
    latitude: 24.148657699999998,
    longitude: 120.67413979999999,
  },
  canLoadMore: true,
};

function _injectPropsFromStore(state) {
  return {
    TradeRecord: state.search.TradeRecord,
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

export default connect(_injectPropsFromStore, _injectPropsFormActions)(TradeRecord);
