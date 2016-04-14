const jsdom = require('jsdom').jsdom;

global.fetch = require('node-fetch');
global.Immutable = require('immutable');
global.should = require('chai').should();
global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;

const options = {
  loose: 'all',
  stage: 1,
  ignore: null,
  only: null,
  extensions: null,
};
require('../node_modules/babel/register')(options);

// mock react-native
const ReactNativeMock = require('react-native-web');
const key = require.resolve('react-native');

require.cache[key] = {
  id: key,
  filename: key,
  loaded: true,
  exports: ReactNativeMock,
};
