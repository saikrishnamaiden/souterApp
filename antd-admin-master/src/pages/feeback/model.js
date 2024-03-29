import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'

const {
  addFeeback,
  deleteSingleFeeback,
  updateFeeback,
  removeUserList,
  getFeeback
} = api

export default modelExtend(pageModel, {
  namespace: 'feeback',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/feeback', location.pathname)) {
          const payload = location.query || { page: 1, pageSize: 10 }
          dispatch({
            type: 'queryFeeback',
            payload,
          })
        }
      })
    },
  },

  effects: {
    *queryFeeback({ payload = {} }, { call, put }) {
      const data = yield call(getFeeback, payload)
      if (data) {
        yield put({
          type: 'queryAllFeebackSuccess',
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

    *delete({ payload }, { call, put }) {
      const data = yield call(deleteSingleFeeback, { id: payload })
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
      const data = yield call(addFeeback, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    *update({ payload }, { call, put }) {
      const data = yield call(updateFeeback, payload)
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

    queryAllFeebackSuccess(state, { payload }) {
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
    
  },
})
