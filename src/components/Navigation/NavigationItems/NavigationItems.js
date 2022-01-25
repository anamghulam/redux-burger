import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact={true}>Burger Builder</NavigationItem>

        {props.isAuthanticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
        {!props.isAuthanticated ?
            <NavigationItem link="/auth">Login</NavigationItem> :
            <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
);
export default NavigationItems;