import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

//this below action type is synchronous
export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderID: id,
        orderData: orderData
    }
}
//this below action type is synchronous
export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

//this below action type is "Asynchronous", Async code does not return an action. ony Sync code returns action. so it does not reaches reducer. BUT we can call a sync function inside it
export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        //the meaning of this below line is that: dispatch the action returned by purchaseBurgerStart()
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error))
            });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

//Start action creators for fetching orders.
export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrdersSuccess = (fetchedOrders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: fetchedOrders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

//Now Async action creator starts
export const fetchOrders = (token, userId) => {
    return (dispatch) => {
        dispatch(fetchOrdersStart());
        //now axios to fetch orders from Firebase
        //using token to get access to only logged in users. token is store in redux store
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));

            })
            .catch(err => {
                dispatch(fetchOrdersFail(err));
            })
    }
}