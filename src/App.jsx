import React from 'react';
import './App.css';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { resetAction, toggleBox } from "./store/room1/actions";
import { toggleCoffin } from "./store/room1/actions/toggle-coffin";
import { Layout } from "./layouts/Layout";

class App extends React.PureComponent {
  static propTypes = {
    boxState: PropTypes.bool.isRequired,
    lightState: PropTypes.bool.isRequired,
    toggleBoxState: PropTypes.func.isRequired,
    toggleLightState: PropTypes.func.isRequired,
    resetBox: PropTypes.func.isRequired,
  };

  static defaultProps = {
    boxState: false
  };

  handleBtnClick = () => {
    this.props.toggleBoxState();
  };

  handleSwitchLightClick = () => {
    this.props.toggleLightState();
  };

  handleResetClick = () => {
    this.props.resetBox();
  };

  render() {
    return (
      <Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  boxState: state.room1.box,
  lightState: state.room1.light,
});

const mapDispatchToProps = {
  toggleBoxState: toggleBox,
  toggleLightState: toggleCoffin,
  resetBox: resetAction,
};

export default App = connect(mapStateToProps, mapDispatchToProps)(App);
