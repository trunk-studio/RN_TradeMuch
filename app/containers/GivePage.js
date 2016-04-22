import React, {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import ActionButton from '../components/ActionButton';
import CheckBox from 'react-native-icon-checkbox';
import * as color from '../style/color';
import { connect } from 'react-redux';
import {
  requestUpdatePostStatus,
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

  handleActionButtonPress = () => {

  }

  render() {
    const candidates = [];
    candidates.push(
      <View key={1} style={[styles.candidateBlock, { backgroundColor: color.LIST_ITEM_COLOR1 }]}>
        <Image style={styles.avatar} source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }} />
        <Text style={styles.userName}>Candy</Text>
          <CheckBox
            style={styles.radioButton}
            iconStyle={{ color: color.TRADEMUCH_MAIN_COLOR_1 }}
            size={30}
            uncheckedIconName="radio-button-unchecked"
            checkedIconName="radio-button-checked"
          />
      </View>
    );
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
};

GivePage.defaultProps = {
  id: 0,
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
