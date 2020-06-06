import axios from 'axios';
import apiAuth from '../api/auth';
import config from '../config';
import jwt from "jsonwebtoken";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

function requestLogin() {
    return {
        type: LOGIN_REQUEST,
    };
}

export function receiveLogin() {
    return {
        type: LOGIN_SUCCESS
    };
}

function loginError(payload) {
    return {
        type: LOGIN_FAILURE,
        payload,
    };
}

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
    };
}

export function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
    };
}

// Logs the user out
export function logoutUser() {
    return (dispatch) => {
        dispatch(requestLogout());
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        axios.defaults.headers.common['Authorization'] = "";
        dispatch(receiveLogout());
    };
}

export function receiveToken(token) {
    return (dispatch) => {
        let user;

        // We check if app runs with backend mode
        if (config.isBackend) {
          user = jwt.decode(token).user;
          delete user.id;
        } else {
          user = {
            email: config.auth.email
          }
        }

        delete user.id;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        axios.defaults.headers.common['Authorization'] = "Bearer " + token;
        dispatch(receiveLogin());
    }
}

export function receiveUser(user) {
    return (dispatch) => {
        localStorage.setItem('user', JSON.stringify(user));
        console.log(user);
        localStorage.setItem('token', 'token');
        dispatch(receiveLogin());
    }
}

export function loginUser(creds) {
    return async (dispatch) => {
        // We check if app runs with backend mode
        if (!config.isBackend) {
            dispatch(receiveToken('token'));
        } else {
            dispatch(requestLogin());
            if (creds.social) {
                window.location.href = config.baseURLApi + "/user/signin/" + creds.social + (process.env.NODE_ENV === "production" ? "?app=sing-app-react" : "");
            } else if (creds.username.length > 0 && creds.password.length > 0) {

                try {
                    const response = await apiAuth.login({username:creds.username, password:creds.password} );
                    dispatch(receiveUser(response.data.data));
                }
                catch(err){
                    // alert('Falha no login, tente novamente.')
                    dispatch(loginError(err?.response?.data?.message));
                }
                
            } else {
                dispatch(loginError('Something was wrong. Try again'));
            }
        }
    };
}
