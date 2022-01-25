import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "../../components/Layout/UI/Input/Input";
import Button from "../../components/Layout/UI/Button/Button";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/Layout/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";

class Auth extends Component {
    state = {
        loginForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: ''
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: ''
            }
        },
        isSignUp: true
    }

    // inputChangedHandler = (event, inputFormField) => {
    //     console.log(inputFormField, event.target.value);
    //     const updatedLoginForm = {
    //         ...this.state.loginForm,
    //         [inputFormField]: {
    //             ...this.state.loginForm[inputFormField],
    //             value: event.target.value
    //         }
    //     }
    //     console.log("new state is:   ", updatedLoginForm);
    //     this.setState({ loginForm: updatedLoginForm });
    //     console.log("state:   ", this.state.loginForm);
    // }

    componentDidMount() {
        //set auth redirec path for users if they already created burgert then redirect to checkout after login.
        //if user not created burger first then it will redirect to Burger Builder after login
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (event, inputFormField) => {

        const updatedLoginForm = {
            ...this.state.loginForm,
        }
        const updatedFormElement = {
            ...updatedLoginForm[inputFormField],
        }
        updatedFormElement.value = event.target.value;
        updatedLoginForm[inputFormField] = updatedFormElement;
        this.setState({ loginForm: updatedLoginForm });

    }


    handleLoginSubmit = (event) => {
        event.preventDefault();
        this.props.onAuthSubmit(this.state.loginForm.email.value, this.state.loginForm.password.value, this.state.isSignUp);
    }

    switchAuthModelHndler = () => {
        //set state can be used in a way that it returns prevState and we can then use it to change or set new.
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp }
        })
    }

    render() {
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p style={{ color: 'red', fontWeight: "bold" }}>{this.props.error.message}</p>
            )
        }
        //here i want to conver state.loginForm to an array
        let formElementsArray = [];
        for (let key in this.state.loginForm) {
            formElementsArray.push({
                id: key,
                config: this.state.loginForm[key]
            })
        }

        let form = (<form onSubmit={this.handleLoginSubmit}>
            {errorMessage}
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            ))}
            <Button btnType="Success">Submit</Button>

        </form>);
        if (this.props.loading) {
            form = <Spinner />;
        }
        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {form}
                <Button
                    btnType="Danger"
                    clicked={this.switchAuthModelHndler}
                >Switch to {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.buildingBurger,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthSubmit: (email, password, isSignup) => { dispatch(actions.auth(email, password, isSignup)) },
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);