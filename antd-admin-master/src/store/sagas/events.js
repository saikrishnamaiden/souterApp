import { all, put, takeLatest } from 'redux-saga/effects';
import { ActionTypes } from '../constants';
import API from '../requests';


export function* getEvents(params) {
  try {
    const response = yield API.getEvents(params.payload);
    yield put({
      type: ActionTypes.GET_EVENTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ActionTypes.GET_EVENTS_FAILURE,
      error: error,
    });
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.GET_EVENTS_REQUEST, getEvents)])
}
