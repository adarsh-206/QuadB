// src/redux/actions/actions.js
export const STORE_SIGNUP_DATA = 'STORE_SIGNUP_DATA';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const storeSignupData = (data) => ({
    type: STORE_SIGNUP_DATA,
    payload: data,
});

export const login = (data) => ({
    type: LOGIN,
    payload: data,
});

export const logout = () => ({
    type: LOGOUT,
});

export const loginFailure = () => ({
    type: LOGIN_FAILURE,
});
