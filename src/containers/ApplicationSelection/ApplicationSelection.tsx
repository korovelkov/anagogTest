import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';
import { connect } from 'react-redux';

import AppForm from './AppForm';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import UploadConfigButton from './UploadConfigButton';

import {
  loadApplications,
  deleteApplication,
  selectApplication,
} from '../../redux/applications/actions';

import { uploadConfig } from '../../redux/config/actions';
import { IApplication } from '../../redux/applications/types';
import { IConfig } from '../../redux/config/types';
import { AppState } from '../../redux';

import './style.scss';

interface IState {
  modalVisible: boolean;
}

interface IProps {
  history: any;
  applications: IApplication[];
  selectedApp: string;
  loadApplications: () => void;
  deleteApplication: (appName: string) => void;
  selectApplication: (appName: string) => void;
  uploadConfig: (config: IConfig) => void;
}

class ApplicationSelection extends Component<IProps, IState> {
  state: IState = {
    modalVisible: false,
  };

  componentDidMount() {
    if (this.props.applications && !this.props.applications.length) {
      this.props.loadApplications();
    }
  }

  openModal = () => {
    this.setState({ modalVisible: true });
  }

  handleCloseModal = () => {
    this.setState({ modalVisible: false });
  }

  deleteApplication = async (enteredAppName: string): Promise<void> => {
    if (this.props.selectedApp !== enteredAppName) {
      alert('Wrong entered Application name');
      return;
    }

    await this.props.deleteApplication(this.props.selectedApp);
    this.handleCloseModal();
  }

  onConfigDownload = (): void => {
    if (!this.isAppSelected) {
      alert('Please choose Application');

      return;
    }

    this.props.history.push('/editConfiguration');
  }

  editUsers = (): void => {
    if (!this.isAppSelected) {
      alert('Please choose Application name, version and build.');

      return;
    }

    this.props.history.push('/editUsers');
  }

  get isAppSelected() {
    return !!this.props.selectedApp;
  }

  render() {
    const { selectedApp, selectApplication, applications = [], uploadConfig } = this.props;
    return (
      <div className="ApplicationSelection">
        <Row type="flex" justify="center">
          <Col>
            <AppForm
              selectedAppName={selectedApp}
              selectApplication={selectApplication}
              applications={applications}
              openModal={this.openModal}
            />
          </Col>
        </Row>
        <Row>
          <Col offset={5} span={4}>
            <UploadConfigButton
              history={this.props.history}
              isAppSelected={this.isAppSelected}
              uploadConfig={uploadConfig}
            />
          </Col>
          <Col span={4}>
            <Button type="primary" onClick={this.onConfigDownload}>
              Download Configuration
            </Button>
          </Col>
        </Row>
        <Row>
          <Col offset={5} span={4}>
            <Button type="primary" onClick={this.editUsers}>
              Edit Users
            </Button>
          </Col>
        </Row>
        <ConfirmDeleteModal
          visible={this.state.modalVisible}
          handleClose={this.handleCloseModal}
          handleDelete={this.deleteApplication}
          appName={selectedApp}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ applications }: AppState) => ({
  applications: applications.list,
  selectedApp: applications.selected,
});

const mapDispatchToProps = {
  loadApplications,
  deleteApplication,
  selectApplication,
  uploadConfig,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationSelection);
