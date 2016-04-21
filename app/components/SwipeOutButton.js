import React, {
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
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
});

export default function SwipeOutButton(props) {
  return (
    <View style={styles.buttonBlock}>
      <Image style={styles.image} source={props.imgSource} />
      <Text style={styles.text}>{props.label}</Text>
    </View>
  );
}

SwipeOutButton.propTypes = {
  imgSource: React.PropTypes.object,
  label: React.PropTypes.string,
};
