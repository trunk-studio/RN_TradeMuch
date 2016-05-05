import React, {
  View,
  Component,
  Alert,
} from 'react-native';
import {
  WHITE_COLOR,
 } from '../style/color';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ActionButton from './ActionButton';
import { requestGetFavoriteList } from '../actions/CategoryActions';
import MultilineRadio from '../components/MultilineRadio';
const styles = React.StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 20,
    backgroundColor: WHITE_COLOR,
  },
});
import { findObjById } from '../utils/immutable';


export default class CreateCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxList: [],
    };
  }

  componentDidMount() {
    this.props.requestGetFavoriteList();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.list.length === 0 && nextProps.list !== this.props.list) {
      const list = nextProps.list.map((item) => {
        return {
          ...item,
          isChecked: false,
        };
      });
      this.setState({
        checkboxList: list,
      });
    }
  }

  handleActionButtonPress = () => {
    Actions.createPost.call();
  }

  categoryItemPress = (id) => {
    const list = findObjById(this.state.checkboxList, 'id', id , (item) => {
      let newItem = {};
      newItem = { ...item };
      newItem.isChecked = !item.isChecked;
      return newItem;
    });
    this.setState({
      checkboxList: list,
    });
  }

  render() {
    return (
      <View style={styles.content}>
        <MultilineRadio
          options={this.state.checkboxList}
          onListItemPress={this.categoryItemPress}
        />
        <ActionButton
          text="確定"
          onPress={this.handleActionButtonPress}
        />
    </View>
    );
  }
}

CreateCategory.propTypes = {
  id: React.PropTypes.number,
  list: React.PropTypes.array,
  requestGetFavoriteList: React.PropTypes.func,
};

CreateCategory.defaultProps = {};

function _injectPropsFromStore({ category }) {
  return {
    list: category.addList
  };
}

const _injectPropsFormActions = {
  requestGetFavoriteList,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(CreateCategory);
