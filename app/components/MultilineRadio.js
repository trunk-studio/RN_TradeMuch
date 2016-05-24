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
import * as color from '../style/color';
import { connect } from 'react-redux';
// import { Actions } from 'react-native-router-flux';
// import ListItem from '../components/PostList/ListItem';
// import config from '../config/index';
import CheckBox from 'react-native-icon-checkbox';
import Dimensions from 'Dimensions';
const windowSize = Dimensions.get('window');
const PIXEL_RATIO = PixelRatio.get();

// const {
//   RNSearchBarManager,
// } = NativeModules;
// import {
//   requestSearchLoadMore,
//   requestSearchPost,
//   requestSearchPostNextPage,
// } from '../actions/SearchPostActions';
// import { requestSetLocation } from '../actions/GeoActions';

const styles = React.StyleSheet.create({
  content: {
    backgroundColor: color.LIST_BACKGROUND_COLOR_1,
    flex: 1,
    // marginTop: 20,
    alignItems: 'center',
    // paddingTop: 20,
  },
  menuItem: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    paddingLeft: 40,
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


export default class MultilineRadio extends Component {
  constructor(props) {
    super(props);
    this.getListItem = this.getListItem.bind(this);
    this.onListItemPress = this.onListItemPress.bind(this);
    const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource,
      showsCancelButton: false,
    };
  }

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.options),
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.options !== this.props.options) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.options),
      });
    }
  }

  onListItemPress = (id) => {
    this.props.onListItemPress(id);
  }

  getListItem(rowData, sectionID, rowID) {
    let bakColor = {};
    if (rowID % 2 === 0) {
      bakColor = { backgroundColor: color.LIST_ITEM_COLOR1 };
    } else {
      bakColor = { backgroundColor: color.LIST_ITEM_COLOR2 };
    }
    return (
      <TouchableOpacity
        style={[styles.menuItem, bakColor]}
        onPress={this.onListItemPress.bind(this, rowData.id)}
      >
        <View style={styles.itemInner}>
          <View style={styles.leftBlock}>
            <Text>{rowData.name}</Text>
          </View>
          <View style={styles.rightBlock}>
            <CheckBox
              id={rowData.id}
              label=""
              size={30}
              checked={rowData.isChecked}
              onPress={this.onListItemPress.bind(this, rowData.id)}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.content}>
        <ListView
          keyboardDismissMode="on-drag"
          dataSource={this.state.dataSource}
          renderRow={this.getListItem}
          onPress={this.onListItemPress}
          style={{alignSelf: 'stretch'}}
        />
      </View>
    );
  }
}

MultilineRadio.propTypes = {
  options: React.PropTypes.array,
  onListItemPress: React.PropTypes.func,
};

MultilineRadio.defaultProps = {
  options: [],
};

// function _injectPropsFromStore(state) {
  // return {
    // MultilineRadio: state.search.MultilineRadio,
    // lastSeachApi: state.search.lastSeachApi,
    // canLoadMore: state.search.canLoadMore,
    // location: state.geo.location,
  // };
// }

// const _injectPropsFormActions = {
//   requestSearchLoadMore,
//   requestSearchPost,
//   requestSetLocation,
//   requestSearchPostNextPage,
// };

// export default connect(_injectPropsFromStore, _injectPropsFormActions)(MultilineRadio);
