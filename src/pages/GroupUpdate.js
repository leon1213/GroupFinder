import React from 'react';
import { useParams } from "react-router-dom";
import { Form, Input, InputNumber, Cascader, Button, message, Table, Select, Rate } from 'antd';
import { useHistory } from 'react-router-dom'
import { organization, formItemLayout, tailFormItemLayout } from '../helpers/constant'

const { Option } = Select;

const GroupUpdate = (props) => {
  const { no } = useParams()
  const [form] = Form.useForm();
  const history = useHistory();
  const userInfo = props.user || {}
  const groups = props.groups
  const group = groups.find(item => item.no == no)
  const user = group ? group.members.find(item => item.username === userInfo.username) : null
  const applications = props.applications
  const onFinish = values => {
    if (!userInfo.username) {
      message.error('Please login first')
      return
    }

    const oldGroupIndex = groups.findIndex(group => group.no == no)
    const { intro, ...rest } = values
    groups.splice(oldGroupIndex, 1, {
      ...rest, no, members: group.members
    })

    props.setGroups(groups)

    message.success('Update group success', 2, () => {
      history.push('/');
    })
  };

  const approve = (member) => {
    const { no, ...rest } = member
    group.members.push(rest)
    props.setGroups(groups)
    const index = applications.findIndex(item => item.no === no)
    applications.splice(index, 1)
    props.setApplications(applications)
    message.success('Approve succeed')
  }

  const setAdministrator = (member) => {
    const { username } = member
    const { members } = group
    const index = members.findIndex(item => item.username === username)
    const obj = members[index]
    obj.role = 'ADMIN'
    Object.assign(group, { members })
    props.setGroups(groups)
    message.success('Set administrator succeed')
  }

  const onRateChange = (member, value) => {
    member.rate = value;
    const { username } = member
    const { members } = group
    const index = members.findIndex(item => item.username === username)
    const obj = members[index]
    obj.rate = value
    Object.assign(group, { members })
    props.setGroups(groups)

    message.success('Thanks for your rating')
  }

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        ['assgnType']: group.assgnType,
        ['assgnNo']: group.assgnNo,
        ['assgnDesc']: group.assgnDesc,
        ['groupname']: group.groupname,
        ['maxNum']: group.maxNum,
        ['organization']: group.organization,
        ['intro']: group.members.find(o => o.role === 'CREATOR').intro,
      }}
      scrollToFirstError
    >
      <Form.Item
        name="groupname"
        label="Group name"
        rules={[{ required: true, message: 'Please input groupname!', whitespace: true }]}
      >
        <Input disabled={!(user && user.role)} />
      </Form.Item>

      <Form.Item
        name="organization"
        label="Organization"
        rules={[
          { type: 'array', required: true, message: 'Please select your organization!' },
        ]}
      >
        <Cascader options={organization} disabled={!(user && user.role)} />
      </Form.Item>

      <Form.Item
        name="maxNum"
        label="Maxmium members"
        rules={[{ required: true, message: 'Please input number!' }]}
      >
        <InputNumber min={group.members.length >= 2 ? group.members.length : 2} max={5} disabled={!(user && user.role)} />
      </Form.Item>

      <Form.Item
        name="assgnType"
        label="Assignment type"
        rules={[{ required: true, message: 'Please select assignment type!', whitespace: true }]}
      >
        <Select disabled={!(user && user.role)}>
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
        <Select disabled={!(user && user.role)}>
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
        <Input.TextArea disabled={!(user && user.role)} />
      </Form.Item>

      <Form.Item
        name="intro"
        label="Creator introduction"
        rules={[{ required: true, message: 'Please input your introduction!', whitespace: true }]}
      >
        <Input.TextArea disabled={!(user && user.role === 'CREATOR')} />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" disabled={!(user && user.role)}>
          Update
        </Button>
        <Button className="btn-back" onClick={() => {
          history.push('/');
        }}>
          Back
        </Button>
      </Form.Item>

      <Form.Item label="Members">
        <Table columns={[
          {
            title: 'User Name',
            dataIndex: 'username',
            key: 'username',
          },
          {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
          },
          {
            title: 'Rate',
            dataIndex: 'rate',
            key: 'rate',
            render(text, member) {
              return <Rate
                allowHalf
                disabled={!userInfo.username}
                defaultValue={0}
                value={member.rate}
                onChange={(v) => onRateChange(member, v)} />
            }
          },
          {
            title: 'Introduction',
            dataIndex: 'intro',
            key: 'intro',
          },
          {
            title: 'Application Reason',
            dataIndex: 'reason',
            key: 'reason',
          },
          {
            title: 'Action',
            key: 'action',
            render: (text, member) => {
              return (
                user && user.role ? member.no ?
                  <Button className="btn-back" onClick={() => approve(member)}>
                    Approve
                  </Button> :
                  (member.role ? '' :
                    <Button className="btn-back" onClick={() => setAdministrator(member)}>
                      Set Administrator
                 </Button>) : ''
              )
            },
          },
        ]}
          dataSource={
            user && user.role ? [...group.members, ...applications.filter(item => item.no == no)] : group.members
          }
          tableLayout="fixed"
          rowKey="username"
          pagination={false} />
      </Form.Item>
    </Form>
  );
};

export default GroupUpdate;
