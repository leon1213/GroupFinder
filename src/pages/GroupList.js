import React, { useState } from 'react';
import { Table, Modal, Form, Row, Col, Input, Button, Cascader, InputNumber, message, Space, Select } from 'antd';
import { organization, modalFormItemLayout } from '../helpers/constant';
import { useHistory } from 'react-router-dom'
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Option } = Select;
const { confirm } = Modal;

const orgRender = org => {
  if (!org) return ''
  const university = 'McMaster University'
  const facultyObj = organization[0].children.find(o => o.value === org[1])
  const faculty = facultyObj.label
  const course = facultyObj.children.find(o => o.value === org[2]).label
  return <span>{`${university}>${faculty}>${course}`}</span>
}

function GroupList(props) {
  const [form] = Form.useForm();
  const history = useHistory();
  const [filterData, setFilterData] = useState(props.groups);
  const userInfo = props.user || {}
  const applications = props.applications
  const [modalVisible, setModalVisible] = useState(false);
  const [joinGroup, setJoinGroup] = useState(null);
  const [joinForm] = Form.useForm();

  const showJoinModal = (group) => {
    if (!userInfo.username) {
      message.warn('Please login first')
      return
    }
    setModalVisible(true)
    setJoinGroup(group)
  }

  const showDeleteGroup = (group) => {
    confirm({
      title: 'Warning',
      icon: <ExclamationCircleOutlined />,
      content: 'Do you Want to delete this group?',
      onOk() {
        const index = props.groups.findIndex(item => item.no === group.no)
        props.groups.splice(index, 1)
        props.setGroups(props.groups)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const columns = [
    {
      title: 'Group Name',
      dataIndex: 'groupname',
      key: 'groupname',
      render: text => <span>{text}</span>,
    },
    {
      title: 'Maxmium Number',
      dataIndex: 'maxNum',
      key: 'maxNum',
    },
    {
      title: 'Assignment Type',
      dataIndex: 'assgnType',
      key: 'assgnType',
    },
    {
      title: 'Assignment No',
      dataIndex: 'assgnNo',
      key: 'assgnNo',
    },
    {
      title: 'Organization',
      key: 'organization',
      dataIndex: 'organization',
      render: orgRender,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, group) => {
        const user = group ? group.members.find(item => item.username === userInfo.username) : null
        const hasApplication = applications.find(item => item.no == group.no && item.username === userInfo.username)
        return (
          <Space>
            <a href="#" onClick={() => { history.push(`/group/${group.no}`) }}>
              Details
            </a>
            {
              !user && group.members.length < group.maxNum ?
                <a href="#" onClick={() => showJoinModal(group)} disabled={!!hasApplication}>
                  {hasApplication ? 'Waiting for approval' : 'Join'}
                </a> : ''
            }
            {
              user && group.members.length === 1 ?
                <a href="#" onClick={() => showDeleteGroup(group)} disabled={!!hasApplication}>
                  Delete
                </a> : ''
            }
          </Space>
        )
      },
    },
  ]

  const handleOk = () => {
    const newApplication = {
      no: joinGroup.no,
      username: userInfo.username,
      role: '',
      rate: null,
      intro: joinForm.getFieldValue('intro'),
      reason: joinForm.getFieldValue('reason'),
    }

    if (applications.find(item => item.no == joinGroup.no && item.username === userInfo.username)) {
      message.error('Duplicated application')
    } else {
      applications.push(newApplication)
      props.setApplications(applications)
    }

    setModalVisible(false)
    joinForm.resetFields()
  };

  const handleCancel = () => {
    setModalVisible(false)
    joinForm.resetFields()
  };

  const onFinish = entries => {
    setFilterData(props.groups.filter(item => {
      const f1 = entries.groupname ? item.groupname.includes(entries.groupname) : true
      const f2 = entries.organization && entries.organization.length ? item.organization.toString() === entries.organization.toString() : true
      const f3 = entries.maxNum ? entries.maxNum === item.maxNum : true
      const f4 = entries.assgnNo ? entries.assgnNo === item.assgnNo : true
      const f5 = entries.assgnType ? entries.assgnType === item.assgnType : true
      return f1 && f2 && f3 && f4 && f5
    }))
  };

  const toCreateGroup = () => {
    if (!userInfo.username) {
      message.warn('Please login first')
      return
    }
    history.push('/group/create')
  }

  return (
    <div style={{ padding: '3rem 5rem 0' }}>
      <Form
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        labelCol={{ span: 8 }}
        labelAlign="right"
        onFinish={onFinish}
      >
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="groupname"
              label="Group name"
            >
              <Input />
            </Form.Item>

          </Col>
          <Col span={8}>
            <Form.Item
              name="organization"
              label="Organization"
            >
              <Cascader options={organization} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="maxNum"
              label="Maxmium members"
            >
              <InputNumber min={2} max={5} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item
              name="assgnType"
              label="Assignment type"
            >
              <Select>
                <Option value="assignment">assignment</Option>
                <Option value="project">project</Option>
                <Option value="lab">lab</Option>
                <Option value="other">other</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="assgnNo"
              label="Assignment number"
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
          </Col>
          <Col span={8} style={{ paddingLeft: '1rem' }}>
            <Button htmlType="submit">
              Search
          </Button>
            <Button
              type="primary"
              style={{ margin: '0 8px' }}
              onClick={toCreateGroup}
            >
              Create Group
          </Button>
          </Col>
        </Row>
      </Form>
      <Table
        columns={columns}
        dataSource={[...filterData]}
        rowKey="groupname"
        tableLayout="fixed"
        pagination={
          {
            defaultCurrent: 1,
            defaultPageSize: 5,
            total: filterData.length,
          }
        }
      />

      <Modal
        visible={modalVisible}
        title="Join group"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancle
            </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Apply to join
            </Button>,
        ]}
      >
        <Form
          {...modalFormItemLayout}
          form={joinForm}
          name="join"
          initialValues={{
            ['username']: userInfo.username
          }}
          scrollToFirstError
        >
          <Form.Item
            name="username"
            label="User Name"
          >
            <Input disabled={true} />
          </Form.Item>

          <Form.Item
            name="intro"
            label="Introduction"
            rules={[{ required: true, message: 'Please input your introduction!', whitespace: true }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="reason"
            label="Application Reason"
            rules={[{ required: true, message: 'Please input your application reason!', whitespace: true }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default GroupList;
