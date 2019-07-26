import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'

const {
  addComment,
  deleteSingleComment,
  updateComment,
  removeUserList,
  getComment,
  getCommentsSubComments
} = api

export default modelExtend(pageModel, {
  namespace: 'comment',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/comment', location.pathname)) {
          const payload = location.query || { page: 1, pageSize: 10 }
          dispatch({
            type: 'queryComment',
            payload,
          })
        }
      })
    },
  },

  effects: {
    *queryComment({ payload = {} }, { call, put }) {
      const data = yield call(getComment, payload)
      if (data) {
        yield put({
          type: 'queryAllCommentSuccess',
          payload: {
            list: data.result.list,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    },

    *queryCommentsSubcomments({payload}, { call, put }) {
      const data = yield call(getCommentsSubComments, payload)
      if (data) {
        yield put({
          type: 'queryAllCommentSubCommentsSuccess',
          payload: {
            list: data.result.list,
          },
        })
      }
    },

    *delete({ payload }, { call, put }) {
      const data = yield call(deleteSingleComment, { id: payload })
      if (data.success) {
        yield put({
          type: 'updateState',
        })
      } else {
        throw data
      }
    },

    *multiDelete({ payload }, {call, put}) {
      const data = yield call(removeUserList, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        throw data
      }
    },

    *create({ payload }, {call, put}) {
      const data = yield call(addComment, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    *update({ payload }, { call, put }) {
      const data = yield call(updateComment, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },
  },
 
  reducers: {
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },

    queryAllCommentSuccess(state, { payload }) {
      const { list, pagination } = payload
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      }
    },

    queryAllCommentSubCommentsSuccess(state, { payload }) {
      const { list } = payload
      return {
        ...state,
        subCommnetsList : list,
      }
    }
    
  },
})
