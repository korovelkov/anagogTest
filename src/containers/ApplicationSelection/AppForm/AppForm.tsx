import React, { Component } from 'react';
import { Select, Row, Col, Button } from 'antd';

import LinkButton from '../../../components/LinkButton';

import { IApplication, IVersion, IBuild } from '../../../redux/applications/types';

import './style.scss';

const Option = Select.Option;

interface IState {
  selectedApp: IApplication;
  selectedVersion: IVersion;
  selectedBuild: IBuild;
}

interface IProps {
  selectedAppName: string;
  applications: IApplication[];
  selectApplication: (name: string) => void;
  openModal: () => void;
}

class AppForm extends Component<IProps, IState> {
  state: IState = {
    selectedApp: null,
    selectedVersion: null,
    selectedBuild: null,
  };

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    const { selectedApp } = this.state;
    if (selectedApp && !this.props.selectedAppName) {
      this.setState({
        selectedApp: null,
        selectedVersion: null,
        selectedBuild: null,
      });
    }
  }

  componentDidMount() {
    const { selectedAppName } = this.props;
    const { selectedApp } = this.state;

    if (selectedAppName && (selectedAppName !== (selectedApp && selectedApp.AppName))) {
      this.setState(this.getSelectedApp(this.props.applications, this.props.selectedAppName));
    }
  }

  getSelectedApp(applications: IApplication[], appName: string): IState {
    const selectedApp = applications.find((app: IApplication) => app.AppName === appName);
    const selectedVersion = this.getCurrentVersion(selectedApp.Versions);
    const selectedBuild = this.getActiveBuild(selectedVersion);

    return {
      selectedApp,
      selectedVersion,
      selectedBuild,
    };
  }

  getCurrentVersion(versions: IVersion[]): IVersion {
    return versions.reduce((acc, v) => {
      const accDate = new Date(acc.Version);
      const vDate = new Date(v.Version);

      if (vDate > accDate) {
        return v;
      }

      return acc;
    });
  }

  getActiveBuild(version: IVersion): IBuild {
    return version.Builds.find((i) => {
      return i.Build === version.ActiveBuild;
    });
  }

  handleApplicationChange = (value: string): void => {
    this.props.selectApplication(value);
    this.setState(this.getSelectedApp(this.props.applications, value));
  }

  handleVersionChange = (value: string): void => {
    const { selectedApp } = this.state;
    const selectedVersion = selectedApp.Versions.find((i: IVersion) => i.Version === value);
    const selectedBuild = this.getActiveBuild(selectedVersion);

    this.setState({
      selectedVersion,
      selectedBuild,
    });
  }

  handleBuildChange = (value: string): void => {
    this.setState({
      selectedBuild: this.state.selectedVersion.Builds.find((i: IBuild) => i.Build === +value),
    });
  }

  render() {
    const { selectedApp, selectedVersion, selectedBuild } = this.state;
    return (
      <form className="AppForm" noValidate autoComplete="off">
        <h1 className="AppForm__title">Select Application</h1>
        <Row align="middle" gutter={8} type="flex">
          <Col span={4} offset={2}>
            <label htmlFor="appName">Application Name</label>
          </Col>
          <Col span={12}>
            <Select
              className="AppForm__select"
              value={selectedApp && selectedApp.AppName || ''}
              onChange={this.handleApplicationChange}
              id="appName"
              placeholder="Select Application..."
            >
              {this.props.applications.map(app => (
                <Option key={app.AppName} value={app.AppName}>
                  {app.AppName}
                </Option>
              ))}
            </Select>
          </Col>
          <Col>
            {!selectedApp && (
              <LinkButton
                to="/applicationCreation"
              >
                Create new
              </LinkButton>
            )}
            {selectedApp && (
              <Button
                onClick={this.props.openModal}
                type="danger"
              >
                Delete Application
              </Button>
            )}
          </Col>
        </Row>
        {selectedApp && (
          <Row align="middle" gutter={8} type="flex">
            <Col span={4} offset={2}>
              <label htmlFor="version">Version</label>
            </Col>
            <Col span={12}>
              <Select
                className="AppForm__select"
                value={selectedVersion && selectedVersion.Version || ''}
                onChange={this.handleVersionChange}
                id="version"
                placeholder="Select Version..."
              >
                {selectedApp.Versions.map(i => (
                  <Option key={i.Version} value={i.Version}>
                    {i.Version}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
        )}
        {selectedVersion && (
          <Row align="middle" gutter={8} type="flex">
            <Col span={4} offset={2}>
              <label htmlFor="version">Build</label>
            </Col>
            <Col span={12}>
              <Select
                className="AppForm__select"
                value={selectedBuild && selectedBuild.Build || ''}
                onChange={this.handleBuildChange}
                id="build"
                placeholder="Select Build..."
              >
                {selectedVersion.Builds.map(i => (
                  <Option key={i.Build} value={i.Build}>
                    {i.Build}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
        )}
        {selectedBuild && (
          <Row align="middle" gutter={8} type="flex">
            <Col span={4} offset={2}>Comment</Col>
            <Col span={12}>
              <div className="AppForm__comment">{selectedBuild.Comment}</div>
            </Col>
          </Row>
        )}
      </form>
    );
  }
}

export default AppForm;
