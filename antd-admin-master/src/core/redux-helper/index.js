import ReduxHandler from '../../core/handler';

var keys = [
  'GET_CITY',
  'GET_EVENTS',
  'GET_FEEBACKS',
  'GET_COMMENTS',
];

var handler = new ReduxHandler(keys);

var ActionTypes = handler.getActionTypes();

var Actions = handler.getActions();

export { ActionTypes, Actions };
