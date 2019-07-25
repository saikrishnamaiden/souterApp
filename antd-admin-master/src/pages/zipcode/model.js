import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'

const {
  addZipcode,
  deleteSingleZipcode,
  updateZipcode,
  removeUserList,
  getZipcode
} = api

export default modelExtend(pageModel, {
  namespace: 'zipcode',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/zipcode', location.pathname)) {
          const payload = location.query || { page: 1, pageSize: 10 }
          dispatch({
            type: 'queryZipcode',
            payload,
          })
        }
      })
    },
  },

  effects: {
    *queryZipcode({ payload = {} }, { call, put }) {
      const data = yield call(getZipcode, payload)
      if (data) {
        yield put({
          type: 'queryAllZipcodeSuccess',
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
      const data = yield call(deleteSingleZipcode, { id: payload })
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
      const data = yield call(addZipcode, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    *update({ payload }, { call, put }) {
      const data = yield call(updateZipcode, payload)
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

    queryAllZipcodeSuccess(state, { payload }) {
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
