import { pathMatchRegexp } from 'utils'
import api from 'api'

let { getSingleSubComments } = api

export default {
  namespace: 'subCommentsDetail',

  state: {
    data: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathMatchRegexp('/subComments/:id', pathname)
        if (match) {
          dispatch({ type: 'querySingleSubComments', payload: { id: match[1] } })
        }
      })
    },
  },

  effects: {
    *querySingleSubComments({ payload }, { call, put }) {
      const data = yield call(getSingleSubComments,payload)
      const { success, result } = data
      if (success) {
        yield put({
          type: 'querySingleSubCommentsSuccess',
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
    querySingleSubCommentsSuccess(state, { payload }) {
      const { data } = payload
      return {
        ...state,
        data,
      }
    },
  },
}
