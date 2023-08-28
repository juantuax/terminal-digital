import { GLOBAL_TYPES } from './types';

export const ReferralSearch = (object) => async dispatch => {
    dispatch({
        type: GLOBAL_TYPES.SET_SEARCH,
        payload: {
            search_data: object
        }
    });
};