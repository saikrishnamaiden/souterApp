import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import { stringify } from 'qs'
import List from './components/List'
import SubCommnetsList from './components/SubCommnetsList'
import Filter from './components/Filter'
import Modal from './components/Modal'
import SubCommentsModal from './components/SubCommentsModal'
import { SelectionTypes } from 'maidengrid'
import { Tabs } from 'antd'


const { TabPane } = Tabs
@withI18n()
@connect(({ comment, loading }) => ({ comment, loading }))
class Comment extends PureComponent {
  state={
    selectedRowKey : [],
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
    const { dispatch, comment } = this.props
    const { list, pagination, selectedRowKeys } = comment

    dispatch({
      type: 'comment/multiDelete',
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
    const { dispatch, comment, loading, i18n } = this.props
    const { currentItem, modalVisible, modalType } = comment

    return {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      destroyOnClose: true,
      maskClosable: false,
      confirmLoading: loading.effects[`comment/${modalType}`],
      title: `${
        modalType === 'create' ? i18n.t`Create comment` : i18n.t`Update comment`
      }`,
      centered: true,
      onOk: data => {
        dispatch({
          type: `comment/${modalType}`,
          payload: data,
        }).then(() => {
          this.handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'comment/hideModal',
        })
      },
    }
  }

  get listProps() {
    const { filterValue } = this.state
    const { dispatch, comment, loading } = this.props
    const { list, pagination, selectedRowKeys } = comment

    return {
      dataSource: list,
      loading: loading.effects['comment/query'],
      pagination,
      filterValue,
      afterDataLoad: (value) => this.setState({ filterValue: value }),
      SelectionType: SelectionTypes.Single,
      onRowChange: (selectedRowKey) => {
        const id = list[selectedRowKey[0]].id
        dispatch({
          type: `comment/queryCommentsSubcomments`,
          payload: { id },
        })
        
        this.setState({selectedRowKey})
      }, 
      onChange: page => {
        this.handleRefresh({
          page: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem: id => {
        dispatch({
          type: 'comment/delete',
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
          type: 'comment/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
      createSubCommentItem(item) {debugger
        dispatch({
          type: 'comment/showSubCommentModal',
          payload: {
            modalType: 'update',
            currentItem: { id: item.id },
          },
        })
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
          type: 'comment/showModal',
          payload: {
            modalType: 'create',
          },
        })
      },
    }
  }

  get subCommentsList() {
    const { dispatch, comment, loading } = this.props
    const { subCommnetsList, pagination, selectedRowKeys, list } = comment

    return {
      dataSource: subCommnetsList,
      loading: loading.effects['comment/query'],
      pagination,
      SelectionType: SelectionTypes.Single,
      onRowChange: (selectedRowKey) => {
        this.setState({selectedRowKey})
      }, 
      onChange: page => {
        this.handleRefresh({
          page: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem: id => {
        dispatch({
          type: 'comment/delete',
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
          type: 'comment/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
    }
  }

  get subCommentsModalProps() {
    const { dispatch, comment, loading, i18n } = this.props
    const { currentItem, subCommentModalVisible, modalType, list } = comment
    const { selectedRowKey } = this.state

    return {
      item: currentItem,
      visible: subCommentModalVisible,
      destroyOnClose: true,
      maskClosable: false,
      confirmLoading: loading.effects[`comment/${modalType}`],
      title: `${
        modalType === 'create' ? i18n.t`Create comment` : i18n.t`Update comment`
      }`,
      centered: true,
      onOk: data => {
        dispatch({
          type: `comment/addSubComment`,
          payload: data,
        }).then(() => { 
          if(selectedRowKey.length === 1){
            const id = list[selectedRowKey[0]].id
            dispatch({
              type: `comment/queryCommentsSubcomments`,
              payload: { id },
            })
          }
          // this.handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'comment/hideSubCommentModal',
        })
      },
    }
  }

  render() {
    const { comment } = this.props
    const { selectedRowKeys } = comment
    const { selectedRowKey } = this.state
    
    return (
      <>
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
        <SubCommentsModal {...this.subCommentsModalProps} />
      </Page>
      <br/>
      {selectedRowKey && selectedRowKey.length == 1 && 
        <Page inner>
          <Tabs>
            <TabPane
              tab='SubComment'
              key='1'
            >
              <SubCommnetsList {...this.subCommentsList} />
            </TabPane>
          </Tabs>
        </Page>
      }
      </>
    )
  }
}

Comment.propTypes = {
  comment: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Comment
