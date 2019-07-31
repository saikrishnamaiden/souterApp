import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {Modal, Avatar } from 'antd'
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
    const { onDeleteItem, onEditItem, i18n } = this.props

    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: i18n.t`Are you sure delete this record?`,
        onOk() {
          onDeleteItem(record.zipcode)
        },
      })
    } else if (e.key === '3') {
      router.push(`/zipcode/${record.zipcode}`)
    }
  }

  render() {
    const { onDeleteItem, onEditItem, i18n, ...tableProps } = this.props

    const columns = [
      {
        title: 'zipcode',
        dataIndex: 'zipcode',
        key: 'zipcode',
        type: 'int'
      },
      {
        title: 'totalPopulation',
        dataIndex: 'totalPopulation',
        key: 'totalPopulation',
       
      },
      {
        title: 'totalMalePopulation',
        dataIndex: 'totalMalePopulation',
        key: 'totalMalePopulation',
       
      },
      {
        title: 'totalFemalePopulation',
        dataIndex: 'totalFemalePopulation',
        key: 'totalFemalePopulation',
       
      },
      {
        title: 'totalBlackPopulation',
        dataIndex: 'totalBlackPopulation',
        key: 'totalBlackPopulation',
       
      },
      {
        title: 'totalWhitePopulation',
        dataIndex: 'totalWhitePopulation',
        key: 'totalWhitePopulation',
       
      },
      {
        title: 'totalLatinoPopulation',
        dataIndex: 'totalLatinoPopulation',
        key: 'totalLatinoPopulation',
       
      },
      {
        title: 'asianPopulation',
        dataIndex: 'asianPopulation',
        key: 'asianPopulation',
       
      },
      {
        title: 'indianPopulation',
        dataIndex: 'indianPopulation',
        key: 'indianPopulation',
       
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
