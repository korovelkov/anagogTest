import React, { Component } from 'react';
import { Button, Input, Row, Col } from 'antd';
import { connect } from 'react-redux';

import {
  createApplication,
} from '../../redux/applications/actions';

import LinkButton from '../../components/LinkButton';

import './style.scss';

interface IState {
  appName: string;
  appAdded: boolean;
}

interface IProps {
  createApplication: (name: string) => boolean;
}

type InputEvent = React.ChangeEvent<HTMLInputElement>;

class ApplicationCreation extends Component<IProps, IState> {
  state: IState = {
    appName: '',
    appAdded: false,
  };

  handleCreateApp = async (): Promise<void> => {
    const appAdded = await this.props.createApplication(this.state.appName);

    this.setState({
      appAdded,
      appName: '',
    });
  }

  handleChange = ({ target: { value } }: InputEvent) => {
    this.setState({
      appName: value,
    });
  }

  render() {
    const { appName, appAdded } = this.state;
    return (
      <div className="ApplicationCreation">
        <form className="ApplicationCreation__form" noValidate autoComplete="off">
          <h1 className="ApplicationCreation__title">Create Application</h1>
          <Row>
            <Col>
              <Input
                addonBefore="Application name"
                onChange={this.handleChange}
                value={appName}
              />
            </Col>
          </Row>
          <Row type="flex" justify="space-between">
            <Col span={4}>
              <Button onClick={this.handleCreateApp} type="primary">Create</Button>
            </Col>
            <Col span={4}>
              <LinkButton to="/ApplicationSelection">Cancel</LinkButton>
            </Col>
          </Row>
          {appAdded &&
            <span className="ApplicationCreation__msg">App has been successfully added</span>
          }
        </form>
      </div>
    );
  }
}

export default connect(null, { createApplication })(ApplicationCreation);
