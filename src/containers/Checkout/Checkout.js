import React, { Component } from "react";
import { connect } from "react-redux";
import CheckoutSummary from "../../components/Order/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/" />;
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary =
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinue={this.checkoutContinueHandler}
                    />
                    <Route path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                    />
                </div>
        }
        return (
            <div>
                {summary}
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}
export default connect(mapStateToProps)(Checkout);