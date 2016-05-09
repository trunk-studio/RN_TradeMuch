import React, {
  View,
  Component,
} from 'react-native';
import {
  WHITE_COLOR,
 } from '../style/color';
import { connect } from 'react-redux';
import ActionButton from './ActionButton';
import { requestGetCategoryList, requestAddCategory } from '../actions/CategoryActions';
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
    const hasAll = false;
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
    this.props.requestAddCategory({
      postId: this.props.id,
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
    </View>
    );
  }
}

CreateCategory.propTypes = {
  id: React.PropTypes.number,
  list: React.PropTypes.array,
  requestGetCategoryList: React.PropTypes.func,
  requestAddCategory: React.PropTypes.func,
};

CreateCategory.defaultProps = {};

function _injectPropsFromStore({ category }) {
  return {
    list: category.addList,
  };
}

const _injectPropsFormActions = {
  requestGetCategoryList,
  requestAddCategory,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(CreateCategory);
