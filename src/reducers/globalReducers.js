import { GLOBAL_TYPES } from '../actions/types';

const initialState = {
search_data : null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GLOBAL_TYPES.SET_SEARCH:
            return {
                ...state,
                search_data :  action.payload.search_data 
            };
        case GLOBAL_TYPES.SEARCH_EMPTY:
            return {
                ...state,
                search_data : null
            };
        default:
            return state;
    }
}