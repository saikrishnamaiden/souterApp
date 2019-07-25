import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Avatar } from 'antd'
import { DropOption } from 'components'
import { Trans, withI18n } from '@lingui/react'
import Link from 'umi/link'
import styles from './List.less'
import { router } from 'utils';

const { confirm } = Modal

@withI18n()
class List extends PureComponent {
  handleMenuClick = (record, e) => {
    const { onDeleteItem, onEditItem, i18n } = this.props

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
      router.push(`/event/${record.id}`)
    }
  }

  render() {
    const { onDeleteItem, onEditItem, i18n, ...tableProps } = this.props

    const columns = [
      {
        title: 'title',
        dataIndex: 'title',
        key: 'title',
       
      },
      {
        title: 'description',
        dataIndex: 'description',
        key: 'description',
       
      },
      {
        title: 'eventImage',
        dataIndex: 'eventImage',
        key: 'eventImage',
       
      },
      {
        title: 'timestamp',
        dataIndex: 'timestamp',
        key: 'timestamp',
       
      },
      {
        title: 'eventDate',
        dataIndex: 'eventDate',
        key: 'eventDate',
       
      },
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
       
      },
      {
        title: 'cityId',
        dataIndex: 'cityId',
        key: 'cityId',
       
      },
      {
        title: 'placeId',
        dataIndex: 'placeId',
        key: 'placeId',
       
      },
      {
        title: <Trans>Operation</Trans>,
        key: 'operation',
        fixed: 'right',
        render: (text, record) => {
          return (
            <DropOption
              onMenuClick={e => this.handleMenuClick(record, e)}
              menuOptions={[
                { key: '1', name: i18n.t`Update` },
                { key: '2', name: i18n.t`Delete` },
                { key: '3', name: i18n.t`View this Record` },
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
