import React from 'react';

import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';

import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary} >
            <h1>Hope it tastes well!</h1>
            <div style={{ width: '100%', margin: 'auto' }} >
                <Burger ingredients={props.ingredients} />
            </div>
            <Button 
                clicked={props.onCheckoutCancelled} 
                buttonType="Danger">
                    Cancel
            </Button>
            <Button 
                clicked={props.onCheckoutContinued} 
                buttonType="Success">
                    Continue
            </Button>
        </div>
    );
};

export default checkoutSummary;