import React from 'react';
import { Form, Input, Checkbox, Cascader, Button, message } from 'antd';
import { useHistory } from 'react-router-dom'
import { organization } from '../helpers/constant'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 18,
      offset: 6,
    },
  },
};

const Register = (props) => {
  const [form] = Form.useForm();
  const history = useHistory();

  const onFinish = values => {
    const users = props.users
    const newUser = users.every(user => user.username !== values.username)
    if (newUser) {
      const { username, password } = values
      users.push({ username, password })
      props.setUsers(users)
      message.success('Register success', 2, () => {
        history.push('/');
      })
    } else {
      message.error('Duplicated user')
    }

  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="username"
        label="Username"
        rules={[{ required: true, message: 'Please input your username!', whitespace: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail 1"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email2"
        label="E-mail 2"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          }
        ]}
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
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject('Should accept agreement'),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
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

export default Register;
