import React, {
  View,
  Text,
  PixelRatio,
  StyleSheet,
} from 'react-native';
import * as color from '../style/color';
const PIXEL_RATIO = PixelRatio.get();

const styles = StyleSheet.create({
  notificationCircle: {
    backgroundColor: color.NOTIFICATION_COLOR,
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
});

export default function NotificationCircle(props) {
  let circleStyle = {};
  let textStyle = {};
  if (props.backgroundColor) {
    circleStyle = {
      backgroundColor: props.backgroundColor,
    };
  }
  if (props.fontColor) {
    textStyle = {
      color: props.fontColor,
    };
  }
  return (
    <View style={[styles.notificationCircle, circleStyle]}>
      <Text style={[styles.textNotification, textStyle]}>
        {props.count > 99 ? '99+' : props.count}
      </Text>
    </View>
  );
}

NotificationCircle.propTypes = {
  count: React.PropTypes.number,
  backgroundColor: React.PropTypes.string,
  fontColor: React.PropTypes.string,
};
