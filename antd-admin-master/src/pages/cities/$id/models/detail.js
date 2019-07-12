import { pathMatchRegexp } from 'utils'
import api from 'api'

let { getSingleCity } = api

export default {
  namespace: 'cityDetail',

  state: {
    data: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathMatchRegexp('/cities/:id', pathname)
        if (match) {
          dispatch({ type: 'querySingleCity', payload: { id: match[1] } })
        }
      })
    },
  },

  effects: {
    *querySingleCity({ payload }, { call, put }) {
      const data = yield call(getSingleCity,payload)
      const { success, result } = data
      if (success) {
        yield put({
          type: 'querySingleCitySuccess',
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
    querySingleCitySuccess(state, { payload }) {
      const { data } = payload
      return {
        ...state,
        data,
      }
    },
  },
}
