import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/';

import { connect } from 'react-redux';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userID);
    }

    render() {

        let orders = <Spinner />

        if (!this.props.loading) {
            orders = (
                <div>
                    {this.props.orders.map(order => {
                        return <Order 
                                    key={order.id} 
                                    ingredients={order.ingredients}
                                    price={+order.price}
                                />
                    })}
                </div>
            )
        }

        return orders;
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userID: state.auth.userID
    }
}

const mapDisparchToProps = dispatch => {
    return  {
        onFetchOrders: (token, userID) => dispatch(
            actions.fetchOrders(token, userID)
        )
    }
}

export default connect(mapStateToProps, mapDisparchToProps)(withErrorHandler(Orders, axios));