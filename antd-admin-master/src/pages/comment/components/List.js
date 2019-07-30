import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal, Avatar } from 'antd'
import { DropOption } from 'components'
import { Trans, withI18n } from '@lingui/react'
import Link from 'umi/link'
import styles from './List.less'
import { router } from 'utils';
import { Table } from '../../../components/Grid'

const { confirm } = Modal

@withI18n()
class List extends PureComponent {
  handleMenuClick = (record, e) => {
    const { onDeleteItem, onEditItem, i18n, createSubCommentItem } = this.props

    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: i18n.t`Are you sure delete this record?`,
        onOk() {
          onDeleteItem(record.id)
        },
      })
    } else if (e.key === '3') {
      router.push(`/comment/${record.id}`)
    } else if (e.key === '4'){
      createSubCommentItem(record)
    }
  }

  render() {
    const { onDeleteItem, onEditItem, i18n, ...tableProps } = this.props

    const columns = [
      {
        title: 'text',
        dataIndex: 'text',
        key: 'text',
       
      },
      {
        title: 'timestamp',
        dataIndex: 'timestamp',
        key: 'timestamp',
       
      },
      {
        title: 'inLocation',
        dataIndex: 'inLocation',
        key: 'inLocation',
       
      },
      {
        title: 'likeCount',
        dataIndex: 'likeCount',
        key: 'likeCount',
       
      },
      {
        title: 'disLikeCount',
        dataIndex: 'disLikeCount',
        key: 'disLikeCount',
       
      },
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
       
      },
      {
        title: 'placeId',
        dataIndex: 'placeId',
        key: 'placeId',
       
      },
      {
        title: 'userId',
        dataIndex: 'userId',
        key: 'userId',
       
      },
      {
        title: <Trans>Operation</Trans>,
        key: 'operation',
        fixed: 'right',
        width: 50,
        render: (text, record) => {
          return (
            <DropOption
              onMenuClick={e => {this.handleMenuClick(record, e)}}
              menuOptions={[
                { key: '1', name: i18n.t`Update` },
                { key: '2', name: i18n.t`Delete` },
                { key: '3', name: i18n.t`View this Record` },
                { key: '4', name: i18n.t`Add Sub Comment` },
              ]}
            />
          )
        },
      },
    ]

    return (
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => i18n.t`Total ${total} Items`,
        }}
        className={styles.table}
        bordered
        scroll={{ x: 1200 }}
        columns={columns}
        simple
        rowKey={record => record.id}
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {}, 
          };
        }}
      />
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
