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
@connect(({ event, loading }) => ({ event, loading }))
class Event extends PureComponent {
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
    const { dispatch, event } = this.props
    const { list, pagination, selectedRowKeys } = event

    dispatch({
      type: 'event/multiDelete',
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
    const { dispatch, event, loading, i18n } = this.props
    const { currentItem, modalVisible, modalType } = event

    return {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      destroyOnClose: true,
      maskClosable: false,
      confirmLoading: loading.effects[`event/${modalType}`],
      title: `${
        modalType === 'create' ? i18n.t`Create event` : i18n.t`Update event`
      }`,
      centered: true,
      onOk: data => {
        dispatch({
          type: `event/${modalType}`,
          payload: data,
        }).then(() => {
          this.handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'event/hideModal',
        })
      },
    }
  }

  get listProps() {
    const { filterValue } = this.state
    const { dispatch, event, loading } = this.props
    const { list, pagination, selectedRowKeys } = event

    return {
      dataSource: list,
      loading: loading.effects['event/query'],
      pagination,
      filterValue,
      afterDataLoad:(value)=>this.setState({filterValue:value}),
      onChange: page => {
        this.handleRefresh({
          page: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem: id => {
        dispatch({
          type: 'event/delete',
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
          type: 'event/showModal',
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
            type: 'event/updateState',
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
        name:filterValue
      
      },
      onFilterChange: filterValues => 
      this.setState({ filterValue: filterValues.name }),
          
      onAdd() {
        dispatch({
          type: 'event/showModal',
          payload: {
            modalType: 'create',
          },
        })
      },
    }
  }

  render() {
    const { event } = this.props
    const { selectedRowKeys } = event

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

Event.propTypes = {
  event: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Event
