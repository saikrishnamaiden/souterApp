import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import { stringify } from 'qs'
import List from './components/List'
import Filter from './components/Filter'
import Modal from './components/Modal'

@withI18n()
@connect(({ subComments, loading }) => ({ subComments, loading }))
class SubComments extends PureComponent {
  state={
    filterValue : ''
  }
  handleRefresh = newQuery => {
    const { location } = this.props
    const { query, pathname } = location

    router.push({
      pathname,
      search: stringify(
        {
          ...query,
          ...newQuery,
        },
        { arrayFormat: 'repeat' }
      ),
    })
  }

  handleDeleteItems = () => {
    const { dispatch, subComments } = this.props
    const { list, pagination, selectedRowKeys } = subComments

    dispatch({
      type: 'subComments/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    }).then(() => {
      this.handleRefresh({
        page:
          list.length === selectedRowKeys.length && pagination.current > 1
            ? pagination.current - 1
            : pagination.current,
      })
    })
  }

  get modalProps() {
    const { dispatch, subComments, loading, i18n } = this.props
    const { currentItem, modalVisible, modalType } = subComments

    return {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      destroyOnClose: true,
      maskClosable: false,
      confirmLoading: loading.effects[`subComments/${modalType}`],
      title: `${
        modalType === 'create' ? i18n.t`Create subComments` : i18n.t`Update subComments`
      }`,
      centered: true,
      onOk: data => {
        dispatch({
          type: `subComments/${modalType}`,
          payload: data,
        }).then(() => {
          this.handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'subComments/hideModal',
        })
      },
    }
  }

  get listProps() {
    const { filterValue } = this.state
    const { dispatch, subComments, loading } = this.props
    const { list, pagination, selectedRowKeys } = subComments

    return {
      dataSource: list,
      loading: loading.effects['subComments/query'],
      pagination,
      filterValue,
      afterDataLoad: (value) => this.setState({ filterValue: value }),
      onChange: page => {
        this.handleRefresh({
          page: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem: id => {
        dispatch({
          type: 'subComments/delete',
          payload: id,
        }).then(() => {
          this.handleRefresh({
            page:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          })
        })
      },
      onEditItem(item) {
        dispatch({
          type: 'subComments/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
      rowSelection: {
        selectedRowKeys,
        onChange: keys => {
          dispatch({
            type: 'subComments/updateState',
            payload: {
              selectedRowKeys: keys,
            },
          })
        },
      },
    }
  }

  get filterProps() {
    const { filterValue } = this.state
    const { location, dispatch } = this.props
    const { query } = location

    return {
      filterValues: {
        name: filterValue
      },
      onFilterChange: filterValues => 
        this.setState({ filterValue: filterValues.name }),
      onAdd() {
        dispatch({
          type: 'subComments/showModal',
          payload: {
            modalType: 'create',
          },
        })
      },
    }
  }

  render() {
    const { subComments } = this.props
    const { selectedRowKeys } = subComments

    return (
      <Page inner>
        <Filter {...this.filterProps} />
        {selectedRowKeys.length > 0 && (
          <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
            <Col>
              {`Selected ${selectedRowKeys.length} items `}
              <Popconfirm
                title="Are you sure delete these items?"
                placement="left"
                onConfirm={this.handleDeleteItems}
              >
                <Button type="primary" style={{ marginLeft: 8 }}>
                  Remove
                </Button>
              </Popconfirm>
            </Col>
          </Row>
        )}
        <List {...this.listProps} />
        <Modal {...this.modalProps} />
      </Page>
    )
  }
}

SubComments.propTypes = {
  subComments: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default SubComments
