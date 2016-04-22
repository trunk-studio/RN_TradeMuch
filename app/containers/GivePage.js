import React, {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import ActionButton from '../components/ActionButton';
import CheckBox from 'react-native-icon-checkbox';
import * as color from '../style/color';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  requestUpdateTradeRecordStatus,
} from '../actions/PostActions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingTop: 5,
    backgroundColor: color.MAIN_BACKGROUND_COLOR,
  },
  titleText: {
    alignItems: 'center',
    marginLeft: 5,
    fontSize: 15,
  },
  scrollView: {
    padding: 5,
  },
  candidateBlock: {
    height: 50,
    padding: 6.5,
    paddingLeft: 10.5,
    paddingRight: 16.5,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: color.LIST_BORDER,
    borderWidth: 0.5,
    justifyContent: 'space-around',
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  userName: {
    width: 200,
    color: color.TRADEMUCH_MAIN_COLOR_1,
    fontWeight: 'bold',
  },
  radioButton: {
  },
});

export default class GivePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxStatus: [],
    };
  }

  componentDidMount() {
    this.onMount();
  }

  componentWillReceiveProps(nextProps) {
    let lock = false;
    if (nextProps.myItems !== this.props.myItems) {
      if (!lock) {
        lock = true;
        Actions.pop(2);
      }
    }
  }

  onMount() {
    let result = false;
    const { id } = this.props;
    const records = this.findMyItemById(id).records;
    const defaultCheckboxStatus = records.map((record) => {
      if (record.status !== 'accepted') result = false;
      else result = true;
      return result;
    });
    this.setState({
      checkboxStatus: defaultCheckboxStatus,
    });
    // console.log("defaultCheckboxStatus=>",defaultCheckboxStatus);
    // console.log("state.checkboxStatus=>",this.state.checkboxStatus);
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
    const { id } = this.props;
    const records = this.findMyItemById(id).records;

    let userId = 0;
    const status = this.state.checkboxStatus;
    for (let i = 0; i < status.length; i++) {
      if (status[i]) userId = records[i].User.id;
    }

    // console.log("userId=>",userId);

    this.props.requestUpdateTradeRecordStatus({
      postId: id,
      userId,
      action: 'accepted',
    });
  }

  handleCheckboxPress = (index) => {
    // console.log("index=>",index);
    let result;
    const checkboxStatus = this.state.checkboxStatus;

    // console.log("checkboxStatus=>",checkboxStatus);

    const newCheckboxStatus = checkboxStatus.map((status, mapIndex) => {
      if (mapIndex === index) result = true;
      else result = false;
      return result;
    });

    // console.log("newCheckboxStatus=>",newCheckboxStatus);

    this.setState({
      checkboxStatus: newCheckboxStatus,
    });
    // console.log("this.state.checkboxStatus=>",this.state.checkboxStatus);
  }

  render() {
    const { id } = this.props;
    const records = this.findMyItemById(id).records;
    const candidates = [];
    let index = 0;


    for (const record of records) {
      let bakColor = {};
      if (record.id % 2 === 0) {
        bakColor = { backgroundColor: color.LIST_ITEM_COLOR1 };
      } else {
        bakColor = { backgroundColor: color.LIST_ITEM_COLOR2 };
      }
      candidates.push(
        <TouchableOpacity
          key={record.id}
          style={[styles.candidateBlock, bakColor]}
          onPress={this.handleCheckboxPress.bind(this, index)}
        >
          <Image style={styles.avatar} source={record.User.Avatar} />
          <Text style={styles.userName}>{record.User.username}</Text>
            <CheckBox
              key={record.User.id}
              style={styles.radioButton}
              iconStyle={{ color: color.TRADEMUCH_MAIN_COLOR_1 }}
              size={30}
              uncheckedIconName="radio-button-unchecked"
              checkedIconName="radio-button-checked"
              checked={this.state.checkboxStatus[index]}
              onPress={this.handleCheckboxPress.bind(this, index)}
            />
        </TouchableOpacity>
      );
      index++;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>選擇要給予的對象</Text>
        <ScrollView style={styles.scrollView}>
          {candidates}
        </ScrollView>
        <ActionButton
          text="確定"
          onPress={this.handleActionButtonPress}
        />
      </View>
    );
  }
}

GivePage.propTypes = {
  id: React.PropTypes.number,
  myItems: React.PropTypes.array,
  requestUpdateTradeRecordStatus: React.PropTypes.func,
};

GivePage.defaultProps = {
  id: 0,
  myItems: [],
};

function _injectPropsFromStore(state) {
  return {
    myItems: state.post.myItems,
  };
}

const _injectPropsFormActions = {
  requestUpdateTradeRecordStatus,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(GivePage);
