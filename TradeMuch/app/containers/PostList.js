import React, { View, TouchableOpacity, ScrollView, Component, ListView, Text} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import List from '../components/PostList/List';
import ListItem from '../components/PostList/ListItem';
import SearchBar from '../components/SearchBar';
import {
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
});


export default class PostList extends Component {
  constructor(props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
    this.onListItemPress = this.onListItemPress.bind(this);
    this.getListItem = this.getListItem.bind(this);
    this.loadMorePost = this.loadMorePost.bind(this);
    let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource,
      searchText: '',
      searchDistance: 0,
      searchLat: 0,
      searchLon: 0,
      canLoadMore: true,
    };
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        this.props.requestSetLocation(position);
        this.props.requestSearchPost(null, '300km', {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        this.setState({
          searchText: null,
          searchDistance: '300km',
          searchLat: position.coords.latitude,
          searchLon: position.coords.longitude,
        });
      },
      (error) => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }
  componentWillReceiveProps(nextProps) {
    console.log("nextProps!!!!!!!!!!",nextProps.postList, this.props.postList, nextProps.postList !== this.props.postList);
    if (nextProps.postList !== this.props.postList) {
      const postList = nextProps.postList.map((post, i) => {
        const item = {
          ...post,
          index: i,
        };
        return item;
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(postList),
        canLoadMore: true,
      });
    }
  }

  onChangeText(value) {
    const { location } = this.props;
    this.props.requestSearchPost(value, '60000km', {
      lat: location.latitude,
      lon: location.longitude,
    }, this.props.postList.length);
    this.setState({
      searchText: value,
      searchDistance: '60000km',
      searchLat: location.latitude,
      searchLon: location.longitude,
    });
  }

  onListItemPress(itemDataId) {
    console.log("!!!!click",itemDataId);
  }

  getListItem(rowData) {
    console.log("rowData!!!",rowData);
    return (
      <ListItem
        index={rowData.index}
        title={rowData.title}
        img={`http://localhost:1337${rowData.pic}`}
        description={rowData.distance !== -1 ? `${rowData.distance} km` : ''}
        onItemPress={this.onListItemPress}
      />
    );
  }
  loadMorePost() {
    this.setState({
      canLoadMore: false,
    });
    // searchText: null,
    // searchDistance: '300km',
    // searchLat: position.coords.latitude,
    // searchLon: position.coords.longitude,
    this.props.requestSearchPostNextPage(
      this.state.searchText,
      this.state.searchDistance,
      { lat: this.state.searchLat,
      lon: this.state.searchLon },
      this.props.postList.length
    );
  }
  render() {
    return (
      <View style={styles.content}>
        <SearchBar onChangeText={this.onChangeText} />
        <ListView
          renderScrollComponent={props => <InfiniteScrollView {...props} />}
          dataSource={this.state.dataSource}
          renderRow={this.getListItem}
          onEndReached={this.onListItemPress}
          onLoadMoreAsync={this.loadMorePost}
          canLoadMore={this.state.canLoadMore}
        />
        <TouchableOpacity onPress={Actions.PostDetail} />
      </View>
    );
  }
}

PostList.propTypes = {
  postList: React.PropTypes.array,
  location: React.PropTypes.object,
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
};

function _injectPropsFromStore(state) {
  return {
    postList: state.search.postList,
    location: state.geo.location,
  };
}

const _injectPropsFormActions = {
  requestSearchPost,
  requestSetLocation,
  requestSearchPostNextPage,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(PostList);
