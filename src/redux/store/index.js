import {applyMiddleware,createStore} from 'redux';
import {createWrapper} from 'next-redux-wrapper';
import thunk from 'redux-thunk';
import rootReducer from '@reducers';
import initialState from './initialState';

const middlewares = [thunk];

// create a makeStore function
const makeStore = context => createStore(rootReducer, initialState, applyMiddleware(...middlewares));

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, {debug: true});