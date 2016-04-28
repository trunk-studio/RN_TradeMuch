import React, {
  PropTypes,
  Component,
} from 'react-native';
import Drawer from 'react-native-drawer';
import SideDrawerContent from './SideDrawerContent';
import * as color from '../style/color';

const styles = {
  drawerStyles: {
    drawer: {
      backgroundColor: color.WHITE_COLOR,
      alignItems: 'center',
      flex: 1,
      flexDirection: 'column',
    },
    main: {
      backgroundColor: color.WHITE_COLOR,
      shadowColor: color.BLACK_COLOR,
      shadowOpacity: 0.4,
      shadowRadius: 3,
    },
    sideDrawerContent: {
      backgroundColor: color.SIDE_DRAWER_CONTENT_BACKGROUND_COLOR,
    },
  },
};

export default class SideDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      drawerDisabled: false,
    };
  }

  onOpen = () => {
    this.props.onOpen();
  }

  onClose = () => {

  }

  openDrawer = () => {
    this._drawer.open();
  };

  closeDrawer = () => {
    this._drawer.close();
  };

  refDrawer = (ref) => {
    this.drawer = ref;
  }

  render() {
    return (
      <Drawer
        ref={this.refDrawer}
        type="displace"
        content={<SideDrawerContent closeDrawer={this.closeDrawer} />}
        tapToClose={true}
        onOpen={this.onOpen}
        onClose={this.onClose}
        disabled={this.state.drawerDisabled}
        styles={styles.drawerStyles}
        tweenHandler={Drawer.tweenPresets.parallax}
        tweenDuration={100}
        negotiatePan
        panCloseMask={0.2}
        openDrawerOffset={60}
        closedDrawerOffset={0}
      >
        {
          React.Children.map(
            this.props.children, c => React.cloneElement(c, { route: this.props.route })
          )
        }
      </Drawer>
    );
  }
}

SideDrawer.propTypes = {
  children: PropTypes.node,
  route: PropTypes.object,
  onOpen: PropTypes.func,
};
