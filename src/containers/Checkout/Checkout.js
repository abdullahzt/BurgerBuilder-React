import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary'
import ContactData from '../ContactData/ContactData';

import {connect} from 'react-redux';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.replace('/');
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ingredients} 
                    onCheckoutCancelled={this.checkoutCancelledHandler}
                    onCheckoutContinued={this.checkoutContinuedHandler}
                />
                <Route 
                    path={this.props.match.url + '/contact-data'} 
                    component={ContactData}
                />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
    }
}

export default connect(mapStateToProps)(Checkout);