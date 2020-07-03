// action.js
//TODO:separate actions and added in a index.js . Do it before coommit.
export const PUSH_STACK_SUCCESS = 'PUSH_STACK_SUCCESSS';
export const POP_STACK = 'POP_STACK';
export const PUSH_STACK_ERROR = 'PUSH_STACK_ERROR';
export const CLEAN_STACK_ERROR = 'CLEAN_STACK_ERROR'

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

export function pushStackSuccess(stat) {
    return {
        type: PUSH_STACK_SUCCESS,
        stat: stat
    }
}
export function pushStackError(error) {
    return {
        type: PUSH_STACK_ERROR,
        error: error
    }
}
export function cleanStackError() {
    return {
        type: CLEAN_STACK_ERROR,
    }
}
export function popStack(key) {
    return {
        type: POP_STACK,
        key : key
    }
}