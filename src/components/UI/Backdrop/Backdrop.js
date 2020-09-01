import React from 'react';

import { CSSTransition } from 'react-transition-group';

import classes from './Backdrop.module.css';

const animationClasses = {
    enter: classes["fade-enter"],
    enterDone: classes["fade-enter-active"],
    exit: classes["fade-exit"],
    exitDone: classes["fade-exit-active"]
}

const animationTiming = {
    enter: 0,
    exit: 300
}

const backdrop = (props) => (
    <CSSTransition in={props.show} unmountOnExit mountOnEnter timeout={animationTiming} classNames={animationClasses} >
        <div onClick={props.clicked} className={classes.Backdrop} ></div>
    </CSSTransition>
);

export default backdrop;