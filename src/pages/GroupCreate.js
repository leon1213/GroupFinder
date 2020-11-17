import React from 'react';
import { Form, Input, InputNumber, Cascader, Button, message, Select } from 'antd';
import { useHistory } from 'react-router-dom'
import { organization, formItemLayout, tailFormItemLayout } from '../helpers/constant'

const { Option } = Select;

const GroupCreate = (props) => {
  const [form] = Form.useForm();
  const history = useHistory();

  const onFinish = values => {
    const no = props.no
    const userInfo = props.user
    const groups = props.groups
    const newGroup = groups.every(group => group.groupname !== values.groupname)
    if (newGroup) {
      const { intro, ...rest } = values
      groups.push({
        ...rest, no, members: [{
          username: userInfo.username,
          role: 'CREATOR',
          rate: null,
          intro,
          reason: null,
        }]
      })
      props.setNo(no + 1)
      props.setGroups(groups)

      message.success('Create group success', 2, () => {
        history.push('/');
      })
    } else {
      message.error('Duplicated group')
    }

  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        ['maxNum']: 3,
        ['organization']: ['mcmaster', 'cs', '4HC3'],
      }}
      scrollToFirstError
    >
      <Form.Item
        name="groupname"
        label="Group name"
        rules={[{ required: true, message: 'Please input groupname!', whitespace: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="organization"
        label="Organization"
        rules={[
          { type: 'array', required: true, message: 'Please select your organization!' },
        ]}
      >
        <Cascader options={organization} />
      </Form.Item>

      <Form.Item
        name="maxNum"
        label="Maxmium members"
        rules={[{ required: true, message: 'Please input number!' }]}
      >
        <InputNumber min={2} max={5} />
      </Form.Item>

      <Form.Item
        name="assgnType"
        label="Assignment type"
        rules={[{ required: true, message: 'Please select assignment type!', whitespace: true }]}
      >
        <Select>
          <Option value="assignment">assignment</Option>
          <Option value="project">project</Option>
          <Option value="lab">lab</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="assgnNo"
        label="Assignment number"
        rules={[{ required: true, message: 'Please select assignment number!', whitespace: true }]}
      >
        <Select>
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
          <Option value="4">4</Option>
          <Option value="5">5</Option>
          <Option value="6">6</Option>
          <Option value="7">7</Option>
          <Option value="8">8</Option>
          <Option value="9">9</Option>
          <Option value="10">10</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="assgnDesc"
        label="Assignment description"
        rules={[{ required: true, message: 'Please input assignment description!', whitespace: true }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        name="intro"
        label="Creator introduction"
        rules={[{ required: true, message: 'Please input your introduction!', whitespace: true }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
        <Button className="btn-back" onClick={() => {
          history.push('/');
        }}>
          Back
        </Button>
      </Form.Item>
    </Form>
  );
};

export default GroupCreate;
