import { AsyncStorage } from 'react-native';

const STORAGE_PREFIX = '@TradeMuch:';

export async function setItem(storageKey, srcValue = '') {
  let value;
  if (!srcValue) {
    value = '';
  } else {
    value = srcValue.toString();
  }
  return await AsyncStorage.setItem(STORAGE_PREFIX + storageKey, value);
}

export async function getItem(storageKey) {
  return await AsyncStorage.getItem(STORAGE_PREFIX + storageKey);
}

export async function removeItem(storageKey) {
  return await AsyncStorage.removeItem(STORAGE_PREFIX + storageKey);
}
