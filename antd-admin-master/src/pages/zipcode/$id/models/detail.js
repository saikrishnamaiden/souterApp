import { pathMatchRegexp } from 'utils'
import api from 'api'

let { getSingleZipcode } = api

export default {
  namespace: 'zipcodeDetail',

  state: {
    data: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathMatchRegexp('/zipcode/:id', pathname)
        if (match) {
          dispatch({ type: 'querySingleZipcode', payload: { id: match[1] } })
        }
      })
    },
  },

  effects: {
    *querySingleZipcode({ payload }, { call, put }) {
      const data = yield call(getSingleZipcode,payload)
      const { success, result } = data
      if (success) {
        yield put({
          type: 'querySingleZipcodeSuccess',
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
    querySingleZipcodeSuccess(state, { payload }) {
      const { data } = payload
      return {
        ...state,
        data,
      }
    },
  },
}
