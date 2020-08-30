import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';

import * as actions from './store/actions/';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout')
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders')
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth')
});

class App extends Component {

  constructor(props) {
    super(props)
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <Layout>
        <Switch>
          { this.props.isAuthenticated && <Route path="/orders" component={asyncOrders} />}
          { this.props.isAuthenticated && <Route path="/checkout" component={asyncCheckout} />}
          <Route path="/auth" exact component={asyncAuth} />
          { this.props.isAuthenticated && <Route path="/logout" exact component={Logout} />}
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/"/>
        </Switch>
      </Layout>
    );
  }

}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(
      actions.authCheckState()
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
