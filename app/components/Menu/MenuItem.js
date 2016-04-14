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
import { NOTIFICATION_COLOR } from '../../style/color';
const windowSize = Dimensions.get('window');
const PIXEL_RATIO = PixelRatio.get();
const styles = StyleSheet.create({
  cellBorder: {
    backgroundColor: 'rgba(164, 164, 164, 0.5)',
    // Trick to get the thinest line the device can display
    height: 2 / PixelRatio.get(),
    marginLeft: 4,
    width: windowSize.width,
  },
  icon: {
    width: 11 * PIXEL_RATIO,
    height: 11 * PIXEL_RATIO,
  },
  blockIcon: {
    alignItems: 'flex-end',
    width: 10 * PIXEL_RATIO,
  },
  blockTitle: {
    flex: 1,
    marginLeft: 10 * PIXEL_RATIO,
    width: 60 * PIXEL_RATIO,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  titleText: {
    color: '#FFF',
    fontSize: 8 * PIXEL_RATIO,
    fontWeight: 'bold',
  },
  contentBlock: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 33 * PIXEL_RATIO,
  },
  blockNotification: {
    width: 10 * PIXEL_RATIO,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCircle: {
    backgroundColor: NOTIFICATION_COLOR,
    borderRadius: 6 * PIXEL_RATIO,
    width: 12 * PIXEL_RATIO,
    height: 12 * PIXEL_RATIO,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textNotification: {
    fontSize: 5 * PIXEL_RATIO,
    color: '#fff',
    fontWeight: '700',
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default function MenuItem(props) {
  function onItemPress() {
    props.onItemPress(props.id);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.contentBlock} onPress={onItemPress}>
        <View style={styles.blockIcon}>
          <Image source={{ uri: props.img }} style={styles.icon} />
        </View>
        <View style={styles.blockTitle}>
          <Text style={styles.titleText}>{props.title}</Text>
        </View>
        <View style={styles.blockNotification}>
          {
            props.notification ?
            (<View style={styles.notificationCircle}>
              <Text style={styles.textNotification}>{props.notification}</Text>
            </View>)
            : <View />
            // <View style={styles.notificationCircle}>
            // <Text style={styles.textNotification}>{123}</Text>
            // </View>
          }
        </View>
      </TouchableOpacity>
      <View style={styles.cellBorder} />
    </View>
  );
}

MenuItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  img: PropTypes.string,
  onItemPress: PropTypes.func,
  notification: PropTypes.string,
};

MenuItem.defaultProps = {
  id: '',
  title: '',
  img: '',
  notification: '',
  onItemPress: () => {},
};
