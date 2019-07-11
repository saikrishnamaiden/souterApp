import { all, put, takeLatest } from 'redux-saga/effects';
import { ActionTypes } from '../constants';
import API from '../requests';

export function* getFeebacks(params) {
  try {
    const response = yield API.getFeebacks(params.payload);
    yield put({
      type: ActionTypes.GET_FEEBACKS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ActionTypes.GET_FEEBACKS_FAILURE,
      error: error,
    });
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.GET_FEEBACKS_REQUEST, getFeebacks)])
}
