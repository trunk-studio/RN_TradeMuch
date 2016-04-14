import React, { PixelRatio, View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import List from '../components/PostList/List';
import SearchBar from '../components/SearchBar';
import { requestSearchPost } from '../actions/SearchPostActions';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = React.StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 6 * PixelRatio.get(),
    backgroundColor: '#fff',
  },
  locationBlock: {
    height: 40 * PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#888',
    flexDirection: 'row',
  },
  locationIcon: {
    paddingRight: 10 * PixelRatio.get(),
  },
  locationText: {
    fontSize: 20,
    color: '#FFF',
  },
});

function NearByPosts(props) {
  const { postList } = props;

  function onChangeText(value) {
    props.requestSearchPost(value, '20km', null);
  }

  function onListItemPress(itemDataId) {

  }

  return (
    <View style={styles.content}>
      <View style={styles.locationBlock}>
        <Icon
          name="map-marker"
          size={30}
          color={'rgba(200, 12, 12, 0.8)'}
          style={styles.locationIcon}
        />
        <Text style={styles.locationText}>大安捷運站</Text>
      </View>
      <SearchBar onChangeText={onChangeText} />
      <List listData={postList} />
      <TouchableOpacity onPress={Actions.PostDetail} />
    </View>
  );
}

NearByPosts.propTypes = {
  postList: React.PropTypes.array,
  requestSearchPost: React.PropTypes.func,
  onListItemPress: React.PropTypes.func,
};

function _injectPropsFromStore(state) {
  return {
    postList: state.search.postList || [{title: 'item1'},{title: 'item2'}],
  };
}

const _injectPropsFormActions = {
  requestSearchPost,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(NearByPosts);
