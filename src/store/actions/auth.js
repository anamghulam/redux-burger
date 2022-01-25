//this is Auth Action Creators file
import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    //here would be code that will automatically clear token after 1 hour is passed.
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

//this below is Async code, above all are Sync code
export const auth = (email, password, isSignup) => {
    return (dispatch) => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAcvWZOmpUjlJflxBeDveHHM2K8PvMmxyk';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAcvWZOmpUjlJflxBeDveHHM2K8PvMmxyk';
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response.data);
                //store data in local storage for session use
                const expiryDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expiryDate', expiryDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(error => {
                console.log(error);
                dispatch(authFail(error.response.data.error));
            });

    }
}

//set auth redirec path for users if they already created burgert then redirect to checkout after login.
//if user not created burger first then it will redirect to Burger Builder after login

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (!token) {
            dispatch(logout());
        } else {
            const expiryDate = new Date(localStorage.getItem('expiryDate'));
            if (expiryDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expiryDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}