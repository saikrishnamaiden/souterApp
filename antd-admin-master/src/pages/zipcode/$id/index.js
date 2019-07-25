import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Page } from 'components'
import styles from './index.less'

@connect(({ zipcodeDetail }) => ({ zipcodeDetail }))
class zipcodeDetail extends PureComponent {
  render() {
    const { zipcodeDetail } = this.props
    const { data } = zipcodeDetail
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

zipcodeDetail.propTypes = {
  zipcodeDetail: PropTypes.object,
}

export default zipcodeDetail
