import { pathMatchRegexp } from 'utils'
import api from 'api'

let { getSingleComment } = api

export default {
  namespace: 'commentDetail',

  state: {
    data: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathMatchRegexp('/comment/:id', pathname)
        if (match) {
          dispatch({ type: 'querySingleComment', payload: { id: match[1] } })
        }
      })
    },
  },

  effects: {
    *querySingleComment({ payload }, { call, put }) {
      const data = yield call(getSingleComment,payload)
      const { success, result } = data
      if (success) {
        yield put({
          type: 'querySingleCommentSuccess',
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
    querySingleCommentSuccess(state, { payload }) {
      const { data } = payload
      return {
        ...state,
        data,
      }
    },
  },
}
