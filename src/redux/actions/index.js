// action.js

export const FETCH_STATS_PENDING = 'FETCH_STATS_PENDING';
export const FETCH_STATS_SUCCESS = 'FETCH_STATS_SUCCESS';
export const FETCH_STATS_ERROR = 'FETCH_STATS_ERROR';

export function fetchStatsPending() {
    return {
        type: FETCH_STATS_PENDING
    }
}

export function fetchStatsSuccess({count,next_cursor,results}) {
    return {
        type: FETCH_STATS_SUCCESS,
        count : count,
        next_cursor: next_cursor,
        data : results.all
    }
}

export function fetchStatsError(error) {
    return {
        type: FETCH_STATS_ERROR,
        error: error
    }
}