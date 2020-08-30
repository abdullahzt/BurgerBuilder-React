import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/';

import axios from '../../axios-orders';

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
    }

    componentDidMount() {
        this.props.onInitIngredients()
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(
            igKey => ingredients[igKey]
        ).reduce((acc, currentVal) => {
            return acc + currentVal;
        }, 0)
        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true })
        } else {
            this.props.onSetAuthRedirect('/checkout')
            this.props.history.push('/auth')
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchased()
        this.props.history.push('/checkout');
    }

    render() {

        const disabledInfo = {
            ...this.props.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] <= 0)
        }

        let orderSummary = null;

        let burger = this.props.error ? <p>Unable to Load Ingredients.</p> : <Spinner />

        if (this.props.ingredients !== null) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        price={this.props.price}
                        showOrder={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                    />
                </Aux>
            )

            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price} />
        }

        // if (this.state.loading) {
        //     orderSummary = <Spinner />
        // }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }

}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(
            actions.addIngredient(ingredientName)
        ),
        onIngredientRemoved: (ingredientName) => dispatch(
            actions.removeIngredient(ingredientName)
        ),
        onInitIngredients: () => dispatch(
            actions.initIngredients()
        ),
        onInitPurchased: () => dispatch(
            actions.purchaseInit()
        ),
        onSetAuthRedirect: (path) => dispatch(
            actions.setAuthRedirect(path)
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));