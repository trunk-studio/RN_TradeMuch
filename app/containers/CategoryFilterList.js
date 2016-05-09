import React, {
  View,
  Component,
  ListView,
} from 'react-native';
import * as color from '../style/color';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ListItem from '../components/PostList/ListItem';
import NetworkStatusBar from '../components/NetworkNotify/NetworkStatusBar';
import ActionButton from './ActionButton';
import config from '../config/index';
import TMListView from './TMListView';
const styles = React.StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 20,
    backgroundColor: color.WHITE_COLOR,
    // paddingBottom: windowSize.height * 0.05,
  },
});


export default class CategoryFilterList extends Component {
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
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.postList !== this.props.postList) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.postList),
      });
    }
  }

  onListItemPress = (id) => {
    Actions.postDetail({ id });
  }

  getListItem(rowData, sectionID, rowID) {
    let bakColor = {};
    if (rowID % 2 === 0) {
      bakColor = { backgroundColor: color.LIST_ITEM_COLOR1 };
    } else {
      bakColor = { backgroundColor: color.LIST_ITEM_COLOR2 };
    }
    let distance = '';
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

  handleActionButtonPress = () => {
    Actions.createPost.call();
  }

  render() {
    return (
      <View style={styles.content}>
        <TMListView
          keyboardDismissMode="on-drag"
          dataSource={this.state.dataSource}
          renderRow={this.getListItem}
        />
        <ActionButton
          text="我要上架"
          img="http://qa.trademuch.co.uk/img/add.png"
          onPress={this.handleActionButtonPress}
        />
        <NetworkStatusBar top={44} />
    </View>
    );
  }
}

CategoryFilterList.propTypes = {
  postList: React.PropTypes.array,
  onListItemPress: React.PropTypes.func,
};

CategoryFilterList.defaultProps = {
  postList: [],
};

function _injectPropsFromStore(state) {
  return {
    postList: state.category.filterList,
  };
}

const _injectPropsFormActions = {};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(CategoryFilterList);
