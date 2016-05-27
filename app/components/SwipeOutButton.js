import React, {
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
const styles = StyleSheet.create({
  buttonBlock: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 24,
    height: 24,
    margin: 5,
  },
  text: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  icon: {
    paddingTop: 3,
    marginBottom: 2
  },
});

export default function SwipeOutButton(props) {
  let icon = null;
  if (props.iconClass && props.iconName) {
    if(props.iconClass === 'fa') {
      icon = (
        <FAIcon name={props.iconName} size={props.iconSize || 30} color={props.iconColor || '#FFF'} style={styles.icon} />
      );
    } else if (props.iconClass === 'material') {
      icon = (
        <MaterialIcon name={props.iconName} size={props.iconSize || 30} color={props.iconColor || '#FFF'} style={styles.icon} />
      );
    }
  } else {
    icon = (
      <Image style={styles.image} source={props.imgSource} />
    );
  }
  return (
    <View style={styles.buttonBlock}>
      {icon}
      <Text style={styles.text}>{props.label}</Text>
    </View>
  );
}

SwipeOutButton.propTypes = {
  imgSource: React.PropTypes.object,
  label: React.PropTypes.string,
  iconClass: React.PropTypes.string,
  iconName: React.PropTypes.string,
  iconSize: React.PropTypes.number,
  iconColor: React.PropTypes.string,
};
