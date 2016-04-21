import React, {
  View,
  Component,
  ListView,
  Alert,
  Image,
  Text,
} from 'react-native';
import { LIST_ITEM_COLOR1, LIST_ITEM_COLOR2 } from '../style/color';
import * as color from '../style/color';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ListItem from '../components/PostList/ListItem';
import ActionButton from '../components/ActionButton';
import config from '../config/index';
import Swipeout from 'react-native-swipeout';
import SwipeOutButton from '../components/SwipeOutButton';

import {
  requestUpdatePostStatus,
} from '../actions/PostActions';
// import config from '../config/index';


const styles = React.StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 20,
    backgroundColor: color.MAIN_BACKGROUND_COLOR,
  },
  ButtomButton: {

  },
});


export default class MyItems extends Component {
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
    const items = this.props.myItems.map((item) => {
      let rightText = '';
      if (item.status === 'off') {
        rightText = '已下架';
      } else if (item.status === 'sold') {
        rightText = '已成交';
      }
      return {
        ...item,
        pic: `${config.serverDomain}${item.pic}`,
        rightText,
      };
    });
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(items),
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.myItems !== this.props.myItems) {
      const items = nextProps.myItems.map((item) => {
        let rightText = '';
        if (item.status === 'off') {
          rightText = '已下架';
        } else if (item.status === 'sold') {
          rightText = '已成交';
        }
        return {
          ...item,
          pic: `${config.serverDomain}${item.pic}`,
          rightText,
        };
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items),
      });
    }
  }

  onListItemPress = (id) => {
    const item = this.findMyItemById(id);
    Actions.ownerPostDetail({
      itemTitle: item.title,
      description: item.description,
      pic: `${config.serverDomain}${item.pic}`,
    });
  }

  onListItemSwipoutPress = () => {
  }

  getListItem(rowData, sectionID, rowID) {
    let bakColor = {};
    if (rowID % 2 === 0) {
      bakColor = { backgroundColor: LIST_ITEM_COLOR1 };
    } else {
      bakColor = { backgroundColor: LIST_ITEM_COLOR2 };
    }
    const distance = '';
    const item = (
      <ListItem
        id={rowData.id}
        title={rowData.title}
        img={rowData.pic}
        description={distance}
        onItemPress={this.onListItemPress}
        bakColor={bakColor}
        rightText={rowData.rightText}
        rightTextStyle={{ color: color.TEXT_PRIMARY_COLOR, fontWeight: 'bold' }}
      />
    );
    let listItem;
    if (rowData.status === 'on') {
      const swipeoutBtns = [
        {
          backgroundColor: color.SWIPE_BUTTON_COLOR_1,
          onPress: this.takeOffPost.bind(this, rowData.id),
          component: (
            <SwipeOutButton label={"下架"} imgSource={{ uri: 'http://i.imgur.com/z83iW6N.png' }} />
          ),
        },
      ];
      listItem = (
        <Swipeout
          right={swipeoutBtns}
          autoClose
        >
          {item}
        </Swipeout>
      );
    } else if (rowData.status === 'off') {
      const swipeoutBtns = [
        {
          backgroundColor: color.SWIPE_BUTTON_COLOR_2,
          onPress: this.putOnPost.bind(this, rowData.id),
          component: (
            <SwipeOutButton label={"上架"} imgSource={{ uri: 'http://i.imgur.com/cxvFxzn.png' }} />
          ),
        },
      ];
      listItem = (
        <Swipeout
          right={swipeoutBtns}
          autoClose
        >
          {item}
        </Swipeout>
      );
    } else {
      listItem = item;
    }
    return listItem;
  }

  takeOffPost = (postId) => {
    this.props.requestUpdatePostStatus(postId, 'off');
  }

  putOnPost = (postId) => {
    this.props.requestUpdatePostStatus(postId, 'on');
  }

  findMyItemById = (id) => {
    const postList = this.props.myItems;
    let postItem = {};
    for (let i = 0; i < postList.length; i++) {
      if (postList[i].id === id) {
        postItem = postList[i];
      }
    }
    return postItem;
  }

  handleActionButtonPress = () => {
    Actions.createPost.call();
  }

  render() {
    return (
      <View style={styles.content}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.getListItem}
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

MyItems.propTypes = {
  myItems: React.PropTypes.array,
  requestUpdatePostStatus: React.PropTypes.func,
};

MyItems.defaultProps = {
  myItems: [],
};

function _injectPropsFromStore(state) {
  return {
    myItems: state.post.myItems,
  };
}

const _injectPropsFormActions = {
  requestUpdatePostStatus,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(MyItems);
