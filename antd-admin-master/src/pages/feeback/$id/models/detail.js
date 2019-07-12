import { pathMatchRegexp } from 'utils'
import api from 'api'

let { getSingleFeeback } = api

export default {
  namespace: 'feebackDetail',

  state: {
    data: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathMatchRegexp('/feeback/:id', pathname)
        if (match) {
          dispatch({ type: 'querySingleFeeback', payload: { id: match[1] } })
        }
      })
    },
  },

  effects: {
    *querySingleFeeback({ payload }, { call, put }) {
      const data = yield call(getSingleFeeback,payload)
      const { success, result } = data
      if (success) {
        yield put({
          type: 'querySingleFeebackSuccess',
          payload: {
            data: result,
          },
        })
      } else {
        throw data
      }
    },
  },

  reducers: {
    querySingleFeebackSuccess(state, { payload }) {
      const { data } = payload
      return {
        ...state,
        data,
      }
    },
  },
}
