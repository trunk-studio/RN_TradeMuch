import React from 'react-native';
import SearchBar from 'react-native-search-bar';

export default function SearchPostBar(props) {
  function _onChangeText(value) {
    props.onChangeText(value);
  }

  return (
    <SearchBar placeholder={'搜尋'}
      onChangeText={ _onChangeText }
      onSearchButtonPress={ _onChangeText }
      onCancelButtonPress={ _onChangeText }
    />
  );
}

SearchPostBar.propTypes = {
  onChangeText: React.PropTypes.func,
};

SearchPostBar.defaultProps = {
  onChangeText: () => {},
};
