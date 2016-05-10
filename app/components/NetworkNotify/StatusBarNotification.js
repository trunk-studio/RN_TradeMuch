import React, {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
let windowSize = Dimensions.get('window');
const isShort = windowSize.width < windowSize.height;
windowSize = {
  width: isShort ? windowSize.width : windowSize.height,
  height: isShort ? windowSize.width : windowSize.height,
};

const styles = StyleSheet.create({
  notify: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    width: windowSize.width,
  },
  text: {
    color: '#fff',
    fontSize: 15,
    padding: 3,
  },
});

export default class StatusBarNotification extends React.Component {

  render() {
    let notify = null;
    if (this.props.show) {
      notify = (
        <View style={[styles.notify, { top: this.props.top }]}>
          <Text style={styles.text}>{this.props.message}</Text>
        </View>
      );
    }
    return notify;
  }
}

StatusBarNotification.propTypes = {
  message: React.PropTypes.string,
  top: React.PropTypes.number,
  show: React.PropTypes.bool,
};

StatusBarNotification.defaultProps = {
  top: 0,
  show: false,
};
