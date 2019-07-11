import { all, put, takeLatest } from 'redux-saga/effects';
import { ActionTypes } from '../constants';
import API from '../requests';

export function* getComments(params) {
  try {
    const response = yield API.getComments(params.payload);
    yield put({
      type: ActionTypes.GET_COMMENTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ActionTypes.GET_COMMENTS_FAILURE,
      error: error,
    });
  }
}

export default function* root() {
  yield all([takeLatest(ActionTypes.GET_COMMENTS_REQUEST, getComments,)])
}
