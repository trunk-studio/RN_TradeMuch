import React from 'react-native';
import { connect } from 'react-redux';
import StatusBarNotification from './StatusBarNotification';

export default function NetworkStatusBar(props) {
  return (
    <StatusBarNotification
      top={props.top}
      message={'需要網路連線'}
      show={props.networkMode}
    />
  );
}


NetworkStatusBar.propTypes = {
  networkMode: React.PropTypes.bool,
  top: React.PropTypes.number,
};

NetworkStatusBar.defaultProps = {
  top: 0,
  networkMode: false,
};

function _injectPropsFromStore(state) {
  return {
    networkMode: state.uiStatus.networkMode,
  };
}

const _injectPropsFormActions = {};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(NetworkStatusBar);
