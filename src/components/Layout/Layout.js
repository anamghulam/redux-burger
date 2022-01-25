import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from "../Navigation/Toolbar/Toolbar";

class layout extends Component {
    render() {
        return (
            <Aux>
                <Toolbar isAuth={this.props.isAuthenticated} />

                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(layout);
