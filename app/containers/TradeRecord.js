import React, {
  View,
  Component,
  Dimensions,
  ListView,
} from 'react-native';
import { LIST_ITEM_COLOR1, LIST_ITEM_COLOR2 } from '../style/color';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ListItem from '../components/PostList/ListItem';
import ActionButton from './ActionButton';
import config from '../config/index';
import * as color from '../style/color';
import {
  requestGetItemDataFromAPI,
} from '../actions/PostDetailActions';

const windowSize = Dimensions.get('window');
const styles = React.StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#fff',
    paddingBottom: windowSize.height * 0.05,
  },
  ButtomButton: {

  },
});


export default class TradeRecord extends Component {
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
    this.onMount();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.TradeRecord !== this.props.tradeRecord) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.TradeRecord),
      });
    }
  }

  onMount() {
    const items = this.props.tradeRecord.map((item) => {
      let rightText = '';
      if (item.status === 'accepted') {
        rightText = '已成交';
      } else if (item.status === 'refused') {
        rightText = '已拒絕';
      }
      let distance = 0;
      const userLocation = this.props.location;
      const itemLocation = item.location;
      if (userLocation) {
        distance = this.calcDistance(
          userLocation.latitude,
          userLocation.longitude,
          itemLocation.lat,
          itemLocation.lon
        );
      }
      return {
        ...item,
        pic: `${config.serverDomain}${item.pic}`,
        rightText,
        distance,
      };
    });
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(items),
    });
  }

  onListItemPress = (id) => {
    Actions.postDetail({ id });
  }

  getListItem(rowData, sectionID, rowID, highlightRow) {
    let bakColor = {};
    if (rowID % 2 === 0) {
      bakColor = { backgroundColor: LIST_ITEM_COLOR1 };
    } else {
      bakColor = { backgroundColor: LIST_ITEM_COLOR2 };
    }
    let distance = '';
    if (rowData.distance !== -1) {
      if (rowData.distance <= 1) {
        distance = `${rowData.distance * 1000} m`;
      } else {
        distance = `${rowData.distance} km`;
      }
    }
    return (
      <ListItem
        id={rowData.id}
        index={rowData.index}
        title={rowData.title}
        img={rowData.pic}
        description={distance}
        onItemPress={this.onListItemPress}
        bakColor={bakColor}
        rightText={rowData.rightText}
        rightTextStyle={{ color: color.TEXT_PRIMARY_COLOR, fontWeight: 'bold' }}
      />
    );
  }

  handleActionButtonPress = () => {
    Actions.createPost.call();
  }

  calcDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = Math.round(R * c * 100) / 100;
    return d;
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

TradeRecord.propTypes = {
  tradeRecord: React.PropTypes.array,
  location: React.PropTypes.object,
};

TradeRecord.defaultProps = {
  tradeRecord: [],
  location: null,
};

function _injectPropsFromStore(state) {
  return {
    tradeRecord: state.post.myTradeRecords,
    location: state.geo.location,
  };
}

const _injectPropsFormActions = {
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(TradeRecord);
