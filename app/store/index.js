import productionConfig from './configureStore.prod';
import devConfig from './configureStore.dev';
import config from '../config';
let loadedStore = null;

if (config.envMode === 'production') {
  loadedStore = productionConfig;
} else {
  loadedStore = devConfig;
}

export const configureStore = loadedStore;
