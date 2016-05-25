import React, {
  View,
  Component,
} from 'react-native';
import {
  WHITE_COLOR,
 } from '../style/color';
import { connect } from 'react-redux';
import ActionButton from './ActionButton';
import { requestGetCategoryList, requestFilterCategory } from '../actions/CategoryActions';
import MultilineRadio from '../components/MultilineRadio';
const styles = React.StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 20,
    backgroundColor: WHITE_COLOR,
  },
});
import { findObjById } from '../utils/immutable';
import MaskView from './MaskView';


export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxList: [],
    };
  }

  componentDidMount() {
    const hasAll = true;
    this.props.requestGetCategoryList(hasAll);
    this.loadList(this.props.list);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.list !== this.props.list) {
      this.loadList(nextProps.list);
    }
  }

  loadList = (originList) => {
    const list = originList.map((item) => {
      return {
        ...item,
        isChecked: false,
      };
    });
    this.setState({
      checkboxList: list,
    });
  }

  handleActionButtonPress = () => {
    let categoryIds = [];
    this.state.checkboxList.forEach((itme) => {
      if (itme.isChecked) {
        categoryIds.push(itme.id);
      }
    });
    this.props.requestFilterCategory({
      categoryIds,
    });
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
        <MaskView />
      </View>
    );
  }
}

Category.propTypes = {
  list: React.PropTypes.array,
  requestGetCategoryList: React.PropTypes.func,
  requestFilterCategory: React.PropTypes.func,
};

Category.defaultProps = {};

function _injectPropsFromStore({ category }) {
  return {
    list: category.list,
  };
}

const _injectPropsFormActions = {
  requestGetCategoryList,
  requestFilterCategory,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(Category);
