import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';
import { connect } from 'react-redux';

import UserForm from './UserForm';
import DeleteUser from './DeleteUser';
import UsersList from './UsersList';
import { addUser, deleteUsers, loadAppUsers } from '../../redux/user/actions';

import { INewUser, IUser } from '../../redux/user/types';
import { AppState } from '../../redux';

import './style.scss';

interface IProps {
  usersList: IUser[];
  selectedApp: string;
  loadAppUsers: (appName: string) => void;
  addUser: (appName: string, userName: INewUser) => void;
  deleteUsers: (appName: string, users: string[]) => void;
}

interface IState {
  openModal: boolean;
}

class EditUsers extends Component<IProps, IState> {
  state = {
    openModal: false,
  };

  componentDidMount() {
    this.props.loadAppUsers(this.props.selectedApp);
  }

  handleAddUser = (values: INewUser) => {
    if (!values.name) return '';

    this.props.addUser(this.props.selectedApp, values);
  }

  handleClose = () => {
    this.setState({ openModal: false });
  }

  openModal = () => {
    this.setState({ openModal: true });
  }

  handleDeleteUsers = (users: string[]) => {
    this.props.deleteUsers(this.props.selectedApp, users);
    this.handleClose();
  }

  render() {
    const { selectedApp, usersList } = this.props;
    return (
      <div className="EditUsers">
        <h1 className="EditUsers__title">Edit users</h1>
        <h5 className="EditUsers__title">Application Name: {selectedApp}</h5>
        <Row>
          <Col span={12}>
            <UsersList users={usersList}/>
          </Col>
          <Col span={12}>
            <UserForm onSubmit={this.handleAddUser}/>
            <Button onClick={this.openModal} type="danger">
              Delete user
            </Button>
          </Col>
        </Row>
        <DeleteUser
          visible={this.state.openModal}
          handleClose={this.handleClose}
          handleDelete={this.handleDeleteUsers}
          users={usersList}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ applications, user }: AppState) => ({
  selectedApp: applications.selected,
  usersList: user.usersList,
});

const mapDispatchToProps = { loadAppUsers, deleteUsers, addUser };

export default connect(mapStateToProps, mapDispatchToProps)(EditUsers);
