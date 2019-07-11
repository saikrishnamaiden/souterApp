import { all, put, takeLatest } from 'redux-saga/effects';
import { ActionTypes } from '../constants';
import API from '../requests';

export function* getCity(params) {
  try {debugger
    const response = yield API.getCity(params.payload);
    yield put({
      type: ActionTypes.GET_CITY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ActionTypes.GET_CITY_FAILURE,
      error: error,
    });
  }
}

export default function* root() {
  yield all ([takeLatest(ActionTypes.GET_CITY_REQUEST, getCity)])
}
