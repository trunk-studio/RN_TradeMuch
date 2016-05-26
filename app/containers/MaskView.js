import { connect } from 'react-redux';
import React, {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
let windowSize = Dimensions.get('window');
// const isShort = windowSize.width < windowSize.height;
// windowSize = {
//   width: isShort ? windowSize.width : windowSize.height,
//   height: isShort ? windowSize.width : windowSize.height,
// };

const styles = StyleSheet.create({
  maskView: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: windowSize.width,
    height: windowSize.height,
    backgroundColor: 'rgba(0,0,0,0)',
  },
});

export function MaskView(props) {
  return (
    props.showMaskView ?
      <View style={styles.maskView} /> :
      <View />
  );
}

MaskView.propTypes = {
  showMaskView: React.PropTypes.bool,
};

MaskView.defaultProps = {
};

function _injectPropsFromStore(state) {
  return {
    showMaskView: state.uiStatus.showMaskView,
  };
}

const _injectPropsFormActions = {
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(MaskView);
