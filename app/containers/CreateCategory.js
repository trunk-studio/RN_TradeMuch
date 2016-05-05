import React, {
  Dimensions,
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
import { requestSetLocation } from '../actions/GeoActions';
import MultilineRadio from '../components/MultilineRadio';

const windowSize = Dimensions.get('window');
const styles = React.StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 20,
    backgroundColor: WHITE_COLOR,
    paddingBottom: windowSize.height * 0.11,
  },
});


export default class CreateCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
  }

  handleActionButtonPress = () => {
    Actions.createPost.call();
  }

  categoryItemPress = () => {
    Alert.alert('click1');
  }

  categoryArray() {
    return [
      {
        id: 0,
        title: 'ALL 都想要',
      },
      {
        id: 1,
        title: '保養品',
      },
      {
        id: 2,
        title: '3C 產品',
      },
      {
        id: 3,
        title: '居家用品',
      },
      {
        id: 4,
        title: '生活家電',
      },
      {
        id: 5,
        title: '運動用品',
      },
      {
        id: 6,
        title: '課本講義',
      },
    ];
  }

  render() {
    return (
      <View style={styles.content}>
        <MultilineRadio
          options={this.categoryArray()}
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
};

CreateCategory.defaultProps = {};

function _injectPropsFromStore(state) {
  return {};
}

const _injectPropsFormActions = {
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(CreateCategory);
