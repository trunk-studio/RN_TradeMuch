import React, { PropTypes, Component } from 'react-native';
import Drawer from 'react-native-drawer';
import SideDrawerContent from './SideDrawerContent';

const styles = {
  drawerStyles: {
    drawer: {
      backgroundColor: '#ffffff',
      alignItems: 'center',
      flex: 1,
      flexDirection: 'column',
    },
    main: {
      backgroundColor: '#ffffff',
      shadowColor: '#000000',
      shadowOpacity: 0.4,
      shadowRadius: 3,
    },
    sideDrawerContent: {
      backgroundColor: '#500505',
    },
  },
};

export default class SideDrawer extends Component {
  state={
    drawerOpen: false,
    drawerDisabled: false,
  };

  onOpen = () => {

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
};
