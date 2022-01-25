import React, { Component } from "react";
import axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

//following imports for redux, advanced redux and thunk
import { connect } from 'react-redux';
import * as actions from "../../store/actions/index";
import Spinner from "../../components/Layout/UI/Spinner/Spinner";
import { AUTH_START } from "../../store/actions/actionTypes";

class Orders extends Component {
    componentDidMount() {
        //axios code is moved to action creator while implementing redux
        this.props.onFetchingOrders(this.props.token, this.props.userId);
    }
    render() {
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders =
                this.props.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                ))
        }


        return (
            <div>
                <h1 style={{ marginTop: "50", textAlign: "center" }}>Here is list of your orders.</h1>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchingOrders: (token, userId) => { dispatch(actions.fetchOrders(token, userId)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));