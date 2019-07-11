import { combineReducers } from 'redux';
import { ReduxGenerator } from '../../core';

const rootReducer = combineReducers({
  getCity : ReduxGenerator.getReducer('GET_CITY'),
  getEvents :  ReduxGenerator.getReducer('GET_EVENTS'),
  getFeebacks :  ReduxGenerator.getReducer('GET_FEEBACKS'),
  getComments :  ReduxGenerator.getReducer('GET_COMMENTS'),
});


export default rootReducer;
