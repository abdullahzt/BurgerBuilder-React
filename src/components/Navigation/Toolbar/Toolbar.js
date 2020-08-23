import React from 'react';

import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';
import MenuButton from '../MenuButton/MenuButton';

const toolbar = (props) => (
    <header className={classes.Toolbar} >
        <MenuButton show={props.opened} />
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <nav className={classes.DesktopOnly} >
            <NavigationItems/>
        </nav>
    </header>
);

export default toolbar;