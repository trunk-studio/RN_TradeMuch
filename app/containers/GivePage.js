import React, {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import ActionButton from '../components/ActionButton';
import CheckBox from 'react-native-icon-checkbox';
import * as color from '../style/color';
import { connect } from 'react-redux';
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
    const { records } = this.props;
    let result = false;
    const defaultCheckboxStatus = records.map((record) => {
      if (record.status !== 'accepted') result = false;
      else result = true;
      return result;
    });

    // console.log("defaultCheckboxStatus=>",defaultCheckboxStatus);

    this.setState({
      checkboxStatus: defaultCheckboxStatus,
    });
    // console.log("state.checkboxStatus=>",this.state.checkboxStatus);
  }

  handleActionButtonPress = () => {
    const { records, id } = this.props;
    // const msg = [];
    // for (const record of records) {
    //   msg.push(
    //     `post id=>${record.post_id}`
    //   );
    // }
    // Alert.alert(msg);

    // const userId = this.state.checkboxStatus.map((staus, i) => {
    //   let tmp = 0;
    //   if (staus) tmp = records[i].User.id;
    //   return tmp;
    // });
    let userId = 0;
    const status = this.state.checkboxStatus;
    for (let i = 0; i < status.length; i++) {
      if (status[i]) userId = records[i].User.id;
    }

    console.log("userId=>",userId);

    this.props.requestUpdateTradeRecordStatus({
      postId: id,
      userId,
      action: 'accepted',
    });
  }

  handleCheck = (index) => {
    // console.log("index=>",index);
    let result;
    const checkboxStatus = this.state.checkboxStatus;

    // console.log("checkboxStatus=>",checkboxStatus);

    const newCheckboxStatus = checkboxStatus.map((status, i) => {
      if (i === index) result = true;
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
    const { records } = this.props;
    const candidates = [];
    let index = 0;

    for (const record of records) {
      candidates.push(
        <View
          key={record.id}
          style={[styles.candidateBlock, { backgroundColor: color.LIST_ITEM_COLOR1 }]}
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
              onPress={this.handleCheck.bind(this, index)}
              checked={this.state.checkboxStatus[index]}
            />
        </View>
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
  records: React.PropTypes.array,
  // myItems: React.PropTypes.array,
  requestUpdateTradeRecordStatus: React.PropTypes.func,
};

GivePage.defaultProps = {
  id: 0,
  // myItems: [],
  records: [],
};

function _injectPropsFromStore(state) {
  return {
    // myItems: state.post.myItems,
  };
}

const _injectPropsFormActions = {
  requestUpdateTradeRecordStatus,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(GivePage);
