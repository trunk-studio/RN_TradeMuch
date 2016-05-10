import { connect } from 'react-redux';
import React, {
  Component,
  ListView,
} from 'react-native';

import {
  openMinimalUIMode,
  closeMinimalUIMode,
} from '../actions/UIStatusActions';


export default class TMListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollOffset: 0,
      enableHandleScroll: true,
    };
  }

  handleScroll = (event: Object) => {
    const scrollOffset = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    const scrollDown = scrollOffset > this.state.scrollOffset;
    const scrollUp = !scrollDown;
    const isBounce = scrollOffset < 20 || contentHeight - scrollOffset - layoutHeight < 40;
    if (this.state.enableHandleScroll && scrollDown && !isBounce) {
      this.props.openMinimalUIMode();
      this.setState({
        enableHandleScroll: false,
      });
      setTimeout(() => {
        this.setState({ enableHandleScroll: true });
      }, 500);
    } else if (scrollUp && !isBounce) {
      // this.setState({ minimalMode: false });
      this.props.closeMinimalUIMode();
    }

    /* update scrollOffset */
    this.setState({
      scrollOffset,
    });

    this.props.onScroll(event);
  }

  render() {
    return (
      <ListView {...this.props} onScroll={this.handleScroll} />
    );
  }
}

TMListView.propTypes = {
  onScroll: React.PropTypes.func,
  openMinimalUIMode: React.PropTypes.func,
  closeMinimalUIMode: React.PropTypes.func,
};

TMListView.defaultProps = {
  onScroll: () => {},
};

function _injectPropsFromStore(state) {
  return {
    minimalMode: state.uiStatus.minimalMode,
  };
}

const _injectPropsFormActions = {
  openMinimalUIMode,
  closeMinimalUIMode,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(TMListView);
