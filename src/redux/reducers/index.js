import {statsReducer} from './stats.reducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    stats:statsReducer
});

export default rootReducer;
