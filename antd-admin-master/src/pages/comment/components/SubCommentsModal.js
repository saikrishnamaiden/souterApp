import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import city from 'utils/city'
import moment from 'moment'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
@withI18n()
@Form.create()
class SubCommentsModal extends PureComponent {
  handleOk = () => {
    const { item = {}, onOk, form, onUpdate, modalType } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      };
    
      if (modalType ==='create' && item.id) {
        data.id = item.id
        data.timestamp = moment().unix()
        onOk(data)
      } else {
        data.id = item.id
        data.commentId = item.commentId
        data.timestamp = item.timestamp
        onUpdate(data)
      }
    })
  }

  render() {
    const { item = {}, onOk, form, i18n, ...modalProps } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label={i18n.t`text`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('text', {
              initialValue: item.text,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`likeCount`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('likeCount', {
              initialValue: item.likeCount,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`disLikeCount`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('disLikeCount', {
              initialValue: item.disLikeCount,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`userId`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('userId', {
              initialValue: item.userId,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

SubCommentsModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default SubCommentsModal
