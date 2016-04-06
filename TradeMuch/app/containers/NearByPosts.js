import React, { View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import List from '../components/PostList/List';
import SearchBar from '../components/SearchBar';
import { requestSearchPost } from '../actions/SearchPostActions';

const styles = React.StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 65,
    backgroundColor: '#fff',
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
      <SearchBar onChangeText={onChangeText} />
      <List listData={postList} onItemPress={onListItemPress} />
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
    postList: state.search.postList,
  };
}

const _injectPropsFormActions = {
  requestSearchPost,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(NearByPosts);
