import { Form, Input, Button, Checkbox, message } from 'antd';
import { useHistory } from 'react-router-dom'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const Login = (props) => {
  const history = useHistory();

  const onFinish = async values => {
    const res = await props.login(values);
    if (!res.data) {
      message.error(res.msg);
      return
    }
    history.push('/')
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Login
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

export default Login;
