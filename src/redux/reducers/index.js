import {statsReducer} from './stats.reducer';
import {stackReducer} from './stack.reducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    stats:statsReducer,
    stack: stackReducer
});

export default rootReducer;
