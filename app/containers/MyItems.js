import React, {
  View,
  Component,
  ListView,
  Alert,
} from 'react-native';
import { LIST_ITEM_COLOR1, LIST_ITEM_COLOR2 } from '../style/color';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ListItem from '../components/PostList/ListItem';
import ActionButton from '../components/ActionButton';
import config from '../config/index';
import Swipeout from 'react-native-swipeout';
// import config from '../config/index';


const styles = React.StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#fff',
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

  onListItemPress = (id) => {
    const item = this.findMyItemById(id);
    Actions.ownerPostDetail({
      itemTitle: item.title,
      description: item.description,
      pic: `${config.serverDomain}${item.pic}`,
    });
  }

  onListItemSwipoutPress = () => {
    Alert.alert('下架');
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
      />
    );
    let listItem;
    if (rowData.status === 'on') {
      const swipeoutBtns = [
        {
          text: '下架',
          onPress: this.onListItemSwipoutPress,
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
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(MyItems);
