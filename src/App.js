import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

import * as actions from './store/actions/';

class App extends Component {

  constructor(props) {
    super(props)
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <Layout>
        <Switch>
          { this.props.isAuthenticated && <Route path="/orders" component={Orders} />}
          { this.props.isAuthenticated && <Route path="/checkout" component={Checkout} />}
          { !this.props.isAuthenticated && <Route path="/auth" exact component={Auth} />}
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
