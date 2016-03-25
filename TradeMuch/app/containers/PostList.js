'use strict';

import React, { View } from 'react-native';
import PostListItem from '../components/PostListItem';
import SearchPostBar from '../components/SearchPostBar';
import { connect } from 'react-redux';

const styles = React.StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 20,
  },
});

function PostList(props) {
  const { postList } = props;
  const postListContainer = [];
  if (postList.length > 0) {
    postList.forEach((post, i) => {
      postListContainer.push(
        <PostListItem
          key={i}
          title={post._source.title}
          uri={`http://localhost:1337/${post._source.pic}`}
        />
      );
    });
  }
  return (
    <View style={styles.content}>
        <SearchPostBar />
        {postListContainer}
    </View>
  );
}

function _injectPropsFromStore(state) {
  return {
    postList: state.search.postList,
  };
}

PostList.propTypes = {
  postList: React.PropTypes.array,
};

PostList.defaultProps = {
  postList: [],
};

const _injectPropsFormActions = {
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(PostList);