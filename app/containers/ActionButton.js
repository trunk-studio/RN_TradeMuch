import { connect } from 'react-redux';
import React, {
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
  PixelRatio,
  Dimensions,
  PropTypes,
  Easing,
  Animated,
} from 'react-native';
import * as color from '../style/color';
let windowSize = Dimensions.get('window');
const isShort = windowSize.width < windowSize.height;
windowSize = {
  width: isShort ? windowSize.width : windowSize.height,
  height: isShort ? windowSize.width : windowSize.height,
};

const PIXEL_RATIO = PixelRatio.get();
const BUTTON_HEIGHT = windowSize.height * 0.11;
const styles = StyleSheet.create({
  icon: {
    width: 12 * PIXEL_RATIO,
    height: 12 * PIXEL_RATIO,
  },
  blockIcon: {
    alignItems: 'flex-end',
    width: 15 * PIXEL_RATIO,
  },
  blockButtonText: {
    width: 60 * PIXEL_RATIO,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 9 * PIXEL_RATIO,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentBlock: {
    flex: 1,
    width: windowSize.width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    position: 'absolute',
    bottom: 0,
    height: BUTTON_HEIGHT,
    width: windowSize.width,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class ActionButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonOpacity: new Animated.Value(1),
      buttonBottom: new Animated.Value(0),
    };
  }

  onPress = () => {
    this.props.onPress();
  }

  buttonAnimate = (opacity, bottom) => {
    const duration = 140;
    Animated.parallel([
      Animated.timing(
        this.state.buttonOpacity,
        {
          duration,
          easing: Easing.linear,
          toValue: opacity,
        }),
      Animated.timing(
        this.state.buttonBottom,
        {
          duration,
          easing: Easing.linear,
          toValue: bottom,
        }
      ),
    ]).start();
  }

  hideButton = () => {
    this.buttonAnimate(0, BUTTON_HEIGHT);
  }

  showButton = () => {
    this.buttonAnimate(1, 0);
  }

  render() {
    if (this.props.minimalMode) {
      this.hideButton();
    } else {
      this.showButton();
    }

    let buttonImg = [];
    if (this.props.img !== '') {
      buttonImg = [
        <View style={styles.blockIcon} key="icon">
          <Image source={{ uri: this.props.img }} style={styles.icon} />
        </View>,
      ];
    }
    return (
      <Animated.View style={[styles.container, { backgroundColor: this.props.color }, {
        opacity: this.state.buttonOpacity,
        transform: [{
          translateY: this.state.buttonBottom,
        }],
      }, this.props.style]}
      >
        <TouchableOpacity style={styles.contentBlock} onPress={this.onPress}>
          {buttonImg}
          <View style={styles.blockButtonText}>
            <Text style={styles.buttonText}>{this.props.text}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

ActionButton.propTypes = {
  text: PropTypes.string,
  img: PropTypes.string,
  color: PropTypes.string,
  onPress: PropTypes.func,
  style: PropTypes.object,
  minimalMode: PropTypes.bool,
};

ActionButton.defaultProps = {
  text: 'click',
  img: '',
  color: color.ACTION_BUTTON,
  onPress: () => {},
};

function _injectPropsFromStore(state) {
  return {
    minimalMode: state.uiStatus.minimalMode,
  };
}

const _injectPropsFormActions = {
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(ActionButton);
