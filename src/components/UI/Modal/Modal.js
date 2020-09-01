import React, { Component } from 'react';
import classes from './Modal.module.css';
import { CSSTransition } from 'react-transition-group';

import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render() {
        const animationClasses = {
            enter: classes["fade-enter"],
            enterDone: classes["fade-enter-active"],
            exit: classes["fade-exit"],
            exitDone: classes["fade-exit-active"]
        }

        const animationTiming = {
            enter: 0,
            exit: 250
        }

        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <CSSTransition unmountOnExit mountOnEnter in={this.props.show} timeout={animationTiming} classNames={animationClasses} >
                    <div className={classes.Modal} >
                        {this.props.children}
                    </div>
                </CSSTransition>
            </Aux>
        )
    }

}

export default Modal;