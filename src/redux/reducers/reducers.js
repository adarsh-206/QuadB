// src/redux/reducers/reducers.js
import { STORE_SIGNUP_DATA, LOGIN, LOGOUT, LOGIN_FAILURE } from '../actions/actions';

const initialState = {
    signupData: {},
    loginData: {},
    isAuthenticated: !!localStorage.getItem('token'),
    token: localStorage.getItem('token') || null,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_SIGNUP_DATA:
            return {
                ...state,
                signupData: action.payload,
            };
        case LOGIN:
            return {
                ...state,
                loginData: action.payload,
                isAuthenticated: true,
            };
        case LOGIN_FAILURE:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                loginData: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

export default rootReducer;