import React from 'react';
import { Modal, Divider } from 'antd';
import { Link } from 'react-router-dom'

class User extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const showConfirm = e => {
      e.preventDefault();

      const { confirm } = Modal;
      confirm({
        title: 'Tips',
        content: 'Do you Want to logout?',
        onOk: () => {
          this.props.logout()
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }

    return this.props.user && this.props.user.username ?
      <>
        <a href="#">{this.props.user && this.props.user.username}</a>
        <Divider type="vertical" />
        <a href="#" onClick={showConfirm}>logout</a>
      </> :
      <>
        <Link to="/login">login</Link>
        <Divider type="vertical" />
        <Link to="/register">register</Link>
      </>;
  }
}

export default User;
