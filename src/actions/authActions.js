import { AUTH_TYPES } from './types';
import { Singin, Singout } from '../helpers/apis/Auth';

export const Login = (object) => async dispatch => {
    dispatch({ type: AUTH_TYPES.LOGIN_REQUEST });

    const response = await Singin(object);
    if (response.statusCode) {
        if (response.statusCode === 200) {
            const token = response.data.token;
            const user = response.data.userData;
            dispatch({
                type: AUTH_TYPES.LOGIN_SUCCESS,
                payload: {
                    token: token,
                    user: user,
                    isLogged: true,
                }
            });
        } else {
            dispatch({
                type: AUTH_TYPES.LOGIN_FAILURE,
                payload: {
                    error: response.statusCode
                }
            });
        }
    } else {
        dispatch({
            type: AUTH_TYPES.LOGIN_FAILURE,
            payload: {
                error: response.statusCode
            }
        });
    }
};

export const Logout = (token) => async dispatch => {
    dispatch({ type: AUTH_TYPES.LOGOUT_REQUEST });

    const response = await Singout(token);
    if (response.statusCode === 200) {
        dispatch({
            type: AUTH_TYPES.LOGOUT_SUCCESS
        });
    } else {
        dispatch({
            type: AUTH_TYPES.LOGOUT_FAILURE
        });
    }
};

export const CleanUp = () => async dispatch => {
    dispatch({ type: AUTH_TYPES.CLEANUP })
};