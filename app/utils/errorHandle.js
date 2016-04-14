import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
export function errorHandle(data) {
  switch (JSON.parse(data).requestStatus) {
    case 403:
      Alert.alert(
        '需要登入喔',
        '登入後體驗更多 TradeMuch 細節', [{
          text: '取消',
        }, {
          text: '登入',
          onPress: () => Actions.login(),
        }]
      );
      // TODO: 這部分 Alert 後會執行到，可在這 return dispatch
      break;
    case 400:
    case 500:
    case 404:
      Alert.alert('請稍候再試');
      break;
    default:
      break;
  }
}
