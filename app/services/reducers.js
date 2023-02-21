import {combineReducers} from 'redux';

import general from './general/generalReducer';

const createReducer = combineReducers({
  general,
});

export default createReducer;
