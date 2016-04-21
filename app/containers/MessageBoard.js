import React, {
  Dimensions,
  View,
  Component,
  ListView,
  Alert,
  SegmentedControlIOS,
} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import * as color from '../style/color';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ListItem from '../components/PostList/ListItem';
import config from '../config/index';
import { receivedReadMessages } from '../actions/MessengerActions';
// import SearchBar from '../components/SearchBar';

const windowSize = Dimensions.get('window');
const styles = React.StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: color.MAIN_BACKGROUND_COLOR,
  },
  header: {
    justifyContent: 'center',
    padding: 10,
  },
});


export default class MessageBoard extends Component {
  constructor(props) {
    super(props);
    this.getListItem = this.getListItem.bind(this);
    const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource,
      showsCancelButton: false,
      selectedIndex: 0,
    };
  }

  componentDidMount() {
    const items = this.props.myItems.map((item) => {
      return {
        ...item,
        pic: `${config.serverDomain}${item.pic}`,
      };
    });
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(items),
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.myItems !== this.props.myItems) {
      let items = [];
      const selectedSegmentIndex = this.state.selectedIndex;
      nextProps.myItems.forEach((item) => {
        const data = {
          ...item,
          pic: `${config.serverDomain}${item.pic}`,
        };
        const allMessage = selectedSegmentIndex === 0;
        const read = selectedSegmentIndex === 1;
        const unread = selectedSegmentIndex === 2;
        if (allMessage) {
          items.push(data);
        } else if (read) {
          if (!item.unReadCount) {
            items.push(data);
          }
        } else if (unread) {
          if (item.unReadCount > 0) {
            items.push(data);
          }
        }
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items),
      });
    }
  }

  onListItemPress = (id) => {
    // this.handleSearchCancelPress();
    this.props.receivedReadMessages(id);
    const item = this.findMyItemById(id);
    Actions.messenger({
      title: item.title,
      postId: item.id,
    });
  }

  getListItem(rowData, sectionID, rowID, highlightRow) {
    let bakColor = {};
    if (rowID % 2 === 0) {
      bakColor = { backgroundColor: color.LIST_ITEM_COLOR1 };
    } else {
      bakColor = { backgroundColor: color.LIST_ITEM_COLOR2 };
    }
    return (
      <ListItem
        id={rowData.id}
        title={rowData.title}
        img={rowData.pic}
        description={''}
        onItemPress={this.onListItemPress}
        bakColor={bakColor}
        notificationCount={rowData.unReadCount}
      />
    );
  }
  findMyItemById = (id) => {
    const postList = this.props.myItems;
    let postItem = {};
    for (const post of postList) {
      if (post.id === id) {
        postItem = post;
        break;
      }
    }
    return postItem;
  }


  handleActionButtonPress = () => {
    Actions.createPost.call();
  }

  handleSelectCnahge = (event) => {
    const selectedSegmentIndex = event.nativeEvent.selectedSegmentIndex;
    const items = [];
    this.props.myItems.forEach((item) => {
      const data = {
        ...item,
        pic: `${config.serverDomain}${item.pic}`,
      };
      const allMessage = selectedSegmentIndex === 0;
      const read = selectedSegmentIndex === 1;
      const unread = selectedSegmentIndex === 2;
      if (allMessage) {
        items.push(data);
      } else if (read) {
        if (!item.unReadCount) {
          items.push(data);
        }
      } else if (unread) {
        if (item.unReadCount > 0) {
          items.push(data);
        }
      }
    });
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(items),
      selectedIndex: selectedSegmentIndex,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <SegmentedControlIOS
            values={['全部', '已讀', '未讀']}
            selectedIndex={this.state.selectedIndex}
            tintColor={color.SEGMENTED_CONTROL_SELECTED}
            onChange={this.handleSelectCnahge}
          />
        </View>
        <ListView
          keyboardDismissMode="on-drag"
          dataSource={this.state.dataSource}
          renderRow={this.getListItem}
        />
    </View>
    );
  }
}

MessageBoard.propTypes = {
  myItems: React.PropTypes.array,
  receivedReadMessages: React.PropTypes.func,
};

MessageBoard.defaultProps = {
  myItems: [],
};

function _injectPropsFromStore(state) {
  return {
    myItems: state.post.myItems,
  };
}

const _injectPropsFormActions = {
  receivedReadMessages,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(MessageBoard);
