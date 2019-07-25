import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Page } from 'components'
import styles from './index.less'

@connect(({ subCommentsDetail }) => ({ subCommentsDetail }))
class SubCommentsDetail extends PureComponent {
  render() {
    const { subCommentsDetail } = this.props
    const { data } = subCommentsDetail
    const content = []
    for (let key in data) {
      if ({}.hasOwnProperty.call(data, key)) {
        content.push(
          <div key={key} className={styles.item}>
            <div>{key}</div>
            <div>{String(data[key])}</div>
          </div>
        )
      }
    }
    return (
      <Page inner>
        <div className={styles.content}>{content}</div>
      </Page>
    )
  }
}

SubCommentsDetail.propTypes = {
  subCommentsDetail: PropTypes.object,
}

export default SubCommentsDetail
