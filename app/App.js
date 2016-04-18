import React from 'react-native';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import Orientation from 'react-native-orientation';
import AppRoutes from './routes';

const store = configureStore();

export default class App extends React.Component {

  componentDidMount() {
    Orientation.lockToPortrait();
  }
  render() {
    return (
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    );
  }
}
