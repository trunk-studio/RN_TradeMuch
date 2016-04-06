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
      paddingLeft: 3,
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
  closeDrawer = () => {
    this._drawer.close()
  };
  openDrawer = () => {
    this._drawer.open()
  };
  render() {
    return (
      <Drawer
        ref={(ref) => {this.drawer = ref;}}
        type="static"
        content={<SideDrawerContent closeDrawer={this.closeDrawer} />}
        tapToClose
        onOpen={() => {

          console.log('onopen')
          // this.setState({drawerOpen: true})
          // if(this.sta)
        }}
        onClose={() => {
          console.log('onclose')
          // this.setState({drawerOpen: false})
        }}
        disabled={this.state.drawerDisabled}
        styles={styles.drawerStyles}
        tweenHandler={Drawer.tweenPresets.parallax}
        tweenDuration={100}
        negotiatePan
        panThreshold={0.08}
        openDrawerOffset={0.2}
        closedDrawerOffset={-5}
        panOpenMask={0.2}
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
  route: React.PropTypes.object,
};

SideDrawer.defaultProps = {
  title: '',
  description: '',
  uri: 'https://unsplash.it/200 / 300 /? random ',
};
