import React, { Component } from 'react';
import { Input, Checkbox, Button, Row, Col } from 'antd';

import './style.scss';

export interface IState {
  name: string;
  updateU: boolean;
  deleteU: boolean;
  addU: boolean;
}

interface IProps {
  onSubmit: (values: IState) => void;
}

class UserForm extends Component<IProps, IState> {
  state: IState = {
    name: '',
    updateU: false,
    deleteU: false,
    addU: false,
  };

  handleChange = (e: any) => {
    const { target } = e;
    const { name, type, checked, value } = target;
    const newValue = type === 'checkbox' ? checked : value;

    if (name in this.state) {
      this.setState({
        [name]: newValue,
      } as Pick<IState, keyof IState>);
    }
  }

  handleAddUser = (): void => {
    this.props.onSubmit(this.state);
    this.setState({
      name: '',
      updateU: false,
      deleteU: false,
      addU: false,
    });
  }

  render() {
    const { name, updateU, deleteU, addU } = this.state;

    // user ts-ignore because there are errors on checkbox id prop
    return (
      <form className="UserForm">
        <Row type="flex" align="middle">
          <Col span={5}>
            <label htmlFor="name">Add New User</label>
          </Col>
          <Col span={10}>
            <Input onChange={this.handleChange} value={name} id="name" name="name"/>
          </Col>
        </Row>
        <Row>
          <Col span={5}>
            <label htmlFor="update">Can update</label>
          </Col>
          <Col span={5}>
            {/*
            // @ts-ignore */}
            <Checkbox onChange={this.handleChange} checked={updateU} id="update" name="updateU"/>
          </Col>
        </Row>
        <Row>
          <Col span={5}>
            <label htmlFor="delete">Can delete</label>
          </Col>
          <Col span={5}>
            {/*
            // @ts-ignore */}
            <Checkbox onChange={this.handleChange} checked={deleteU} id="delete" name="deleteU"/>
          </Col>
        </Row>
        <Row>
          <Col span={5}>
            <label htmlFor="addUsers">Can Add Users</label>
          </Col>
          <Col span={5}>
            {/*
            // @ts-ignore */}
            <Checkbox onChange={this.handleChange} checked={addU} id="addUsers" name="addU"/>
          </Col>
        </Row>
        <Button
          disabled={!this.state.name}
          onClick={this.handleAddUser}
        >
          Add user
        </Button>
      </form>
    );
  }
}

export default UserForm;
