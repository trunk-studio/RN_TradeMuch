import React, {
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
  PixelRatio,
  Dimensions,
  PropTypes,
} from 'react-native';
const windowSize = Dimensions.get('window');
const PIXEL_RATIO = PixelRatio.get();
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
  },
  contentBlock: {
    width: windowSize.width,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    position: 'absolute',
    bottom: 0,
    height: windowSize.height * 0.11,
    width: windowSize.width,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function ActionButton(props) {
  function onPress() {
    props.onPress();
  }

  let buttonImg = [];
  if (props.img !== '') {
    buttonImg = [
      <View style={styles.blockIcon} key="icon">
        <Image source={{ uri: props.img }} style={styles.icon} />
      </View>,
    ];
  }

  return (
    <View style={[styles.container, { backgroundColor: props.color }]}>
      <TouchableOpacity style={styles.contentBlock} onPress={onPress}>
        {buttonImg}
        <View style={styles.blockButtonText}>
          <Text style={styles.buttonText}>{props.text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

ActionButton.propTypes = {
  text: PropTypes.string,
  img: PropTypes.string,
  color: PropTypes.string,
  onPress: PropTypes.func,
};

ActionButton.defaultProps = {
  text: 'click',
  img: '',
  color: 'rgb(95, 162, 146)',
  onPress: () => {},
};
