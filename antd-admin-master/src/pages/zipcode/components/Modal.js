import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import city from 'utils/city'

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
class ZipcodeModal extends PureComponent {
  handleOk = () => {
    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      };
      if (item.id) data.id = item.id
      onOk(data)
    })
  }
  render() {
    const { item = {}, onOk, form, i18n, ...modalProps } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label={i18n.t`zipcode`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('zipcode', {
              initialValue: item.zipcode,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`totalPopulation`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('totalPopulation', {
              initialValue: item.totalPopulation,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`totalMalePopulation`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('totalMalePopulation', {
              initialValue: item.totalMalePopulation,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`totalFemalePopulation`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('totalFemalePopulation', {
              initialValue: item.totalFemalePopulation,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`totalBlackPopulation`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('totalBlackPopulation', {
              initialValue: item.totalBlackPopulation,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`totalWhitePopulation`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('totalWhitePopulation', {
              initialValue: item.totalWhitePopulation,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`totalLatinoPopulation`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('totalLatinoPopulation', {
              initialValue: item.totalLatinoPopulation,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`asianPopulation`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('asianPopulation', {
              initialValue: item.asianPopulation,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`indianPopulation`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('indianPopulation', {
              initialValue: item.indianPopulation,
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

ZipcodeModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default ZipcodeModal
