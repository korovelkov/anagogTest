import React, { Component } from 'react';
import { Button, Input, Modal } from 'antd';

import './style.scss';

interface IProps {
  handleClose: () => void;
  handleDelete: (value: string) => void;
  appName: string;
  visible: boolean;
}

interface IState {
  value: string;
}

class ConfirmDeleteModal extends Component<IProps, IState> {
  state = {
    value: '',
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
  }

  onDelete = () => {
    if (this.props.handleDelete) {
      this.props.handleDelete(this.state.value);
    }
  }

  render() {
    const { handleClose, appName, visible } = this.props;

    return (
      <Modal
        className="ConfirmDeleteModal"
        visible={visible}
        title="Are you sure?"
        onCancel={handleClose}
        footer={[
          <Button key="delete" type="danger" onClick={this.onDelete}>
            Delete Application
          </Button>,
          <Button key="cancel" onClick={handleClose}>Cancel</Button>,
        ]}
      >
        <div className="ConfirmDeleteModal__content">
          Are you want to delete <b>{appName}</b>?
          If so type the name of the app and press the <b>delete</b> button
          <div className="ConfirmDeleteModal__input">
            <Input
              id="name"
              onChange={this.handleInputChange}
              value={this.state.value}
              autoFocus
            />
          </div>
        </div>
      </Modal>
    );
  }
}

export default ConfirmDeleteModal;
