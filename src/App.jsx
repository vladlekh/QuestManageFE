import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { noop } from "lodash";
import './App.css';
import { getStructureAction } from "./store/app/actions";
import { selectAppLoading, selectMenuConfig, selectRouterConfig } from "./store/app/selectors";
import { Preloader } from "./components/preloader";
import { Layout } from "./layouts";
import { AppRouter } from "./router";
import { Notifier } from "./feature/notifier";


export class AppComponent extends React.Component {
  static propTypes = {
    loading: PropTypes.bool,
    routerConfig: PropTypes.arrayOf(PropTypes.shape({
      path: PropTypes.string,
      exact: PropTypes.optional,
      component: PropTypes.func,
    })),
    menuConfig: PropTypes.arrayOf(PropTypes.shape({
      path: PropTypes.string,
      name: PropTypes.string,
      title: PropTypes.string,
      icon: PropTypes.node,
    })),
    getStructure: PropTypes.func,
    closeNotification: PropTypes.func,
  };

  static defaultProps = {
    loading: false,
    routerConfig: [],
    getStructure: noop,
  };

  componentDidMount() {
    this.props.getStructure();
  }

  render() {
    return this.props.loading
      ? <Preloader full/>
      : (
        <>
          <Notifier/>
          <Layout menuConfig={this.props.menuConfig}>
            <AppRouter routerConfig={this.props.routerConfig}/>
          </Layout>
        </>
      )
  }
}

const mapStateToProps = state => ({
  loading: selectAppLoading(state),
  routerConfig: selectRouterConfig(state),
  menuConfig: selectMenuConfig(state),
});

const mapDispatchToProps = {
  getStructure: getStructureAction,
};

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
