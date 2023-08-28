import { AUTH_TYPES } from '../actions/types';

const initialState = {
    user: null,
    token: null,
    isLogged: false,
    isLoading: false,
    image: '',
    error: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case AUTH_TYPES.LOGIN_REQUEST:
            return {
                ...state,
                isLogged: false,
                isLoading: true,
                user: null
            };
        case AUTH_TYPES.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isLogged: true,
                token: action.payload.token,
                user: action.payload.user,
                image:'',
                error: null
            };
        case AUTH_TYPES.LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                isLogged: false,
                user: null,
                error: action.payload.error
            };
        case AUTH_TYPES.LOGOUT_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case AUTH_TYPES.LOGOUT_SUCCESS:
            return {};
        case AUTH_TYPES.CLEANUP:
            state.user = null;
            state.token = null;
            state.isLoading = false;
            state.isLogged = false;
            state.isAdmin = false;
            return {
                ...state
            };
        case AUTH_TYPES.LOGOUT_FAILURE:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}