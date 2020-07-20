import React, { Component } from 'react';
import { Checkbox, Button, Modal } from 'antd';

import { IUser } from '../../../redux/user/types';

import './style.scss';

interface IState {
  checkedUsers: string[];
}

interface IProps {
  handleDelete: (ids: string[]) => void;
  handleClose: () => void;
  users: IUser[];
  visible: boolean;
}

class DeleteUser extends Component<IProps, IState> {
  state: IState = {
    checkedUsers: [],
  };

  handleChange = (id: string) => () => {
    const { checkedUsers } = this.state;
    const currentIndex = checkedUsers.indexOf(id);

    if (currentIndex === -1) {
      this.setState(prev => ({
        checkedUsers: [...prev.checkedUsers, id],
      }));
    } else {
      const newChecked = checkedUsers.filter(uId => uId !== id);
      this.setState({
        checkedUsers: newChecked,
      });
    }
  }

  handleDeleteUsers = (): void => {
    this.props.handleDelete(this.state.checkedUsers);
  }

  render() {
    const { handleClose, users, visible } = this.props;

    return (
      <Modal
        className="DeleteUser"
        visible={visible}
        title="Select users to delete"
        onCancel={handleClose}
        footer={[
          <Button
            key="delete"
            type="danger"
            onClick={this.handleDeleteUsers}
          >
            Delete Selected Users
          </Button>,
          <Button type="primary" key="cancel" onClick={handleClose}>Cancel</Button>,
        ]}
      >
        {users.map(user => (
          <label className="DeleteUser__item" key={user.id}>
            <span>{user.name}</span>
            <Checkbox
              onChange={this.handleChange(user.id)}
              checked={this.state.checkedUsers.indexOf(user.id) !== -1}
            />
          </label>
        ))}
      </Modal>
    );
  }
}

export default DeleteUser;
