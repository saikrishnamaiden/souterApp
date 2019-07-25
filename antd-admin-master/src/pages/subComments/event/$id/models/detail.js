import { pathMatchRegexp } from 'utils'
import api from 'api'

let { getSingleEvent } = api

export default {
  namespace: 'eventDetail',

  state: {
    data: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathMatchRegexp('/event/:id', pathname)
        if (match) {
          dispatch({ type: 'querySingleEvent', payload: { id: match[1] } })
        }
      })
    },
  },

  effects: {
    *querySingleEvent({ payload }, { call, put }) {
      const data = yield call(getSingleEvent,payload)
      const { success, result } = data
      if (success) {
        yield put({
          type: 'querySingleEventSuccess',
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
    querySingleEventSuccess(state, { payload }) {
      const { data } = payload
      return {
        ...state,
        data,
      }
    },
  },
}
