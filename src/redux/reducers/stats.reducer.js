// reducer.js
import {HYDRATE} from 'next-redux-wrapper';
import {FETCH_STATS_PENDING, FETCH_STATS_SUCCESS, FETCH_STATS_ERROR} from '@actions';
import initialState from '@store/initialState'


export function statsReducer(state = initialState.stats, action) {
    switch(action.type) {
        case HYDRATE:
            return {...state, ...action.payload.stats};
        case FETCH_STATS_PENDING: 
            return {
                ...state,
                pending: true
            }
        case FETCH_STATS_SUCCESS:
            return {
                ...state,
                pending: false,
                count: state.count + action.count,
                next_cursor: action.next_cursor,
                data : state.data ? [...state.data,...action.data] : action.data
            }
        case FETCH_STATS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default: 
            return state;
    }
}

export const getData = state => state.data;
export const getPending = state => state.pending;
export const getError = state => state.error;