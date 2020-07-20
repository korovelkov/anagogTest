import React, { Component } from 'react';
import { Input, Checkbox, Button, Row, Col } from 'antd';

import { IConfig } from '../../../redux/config/types';

import './style.scss';

type FieldValue = string | number | boolean;

interface IProps {
  onSave: (values: IState) => void;
  onUpload: (values: IState) => void;
  showSuccessMessage: boolean;
  config: IConfig;
}

export interface IState {
  [key: string]: FieldValue;
}

class ConfigForm extends Component<IProps, IState> {
  state: IState = {} as IState;

  handleChange = (e: any) => {
    const target = e.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  getValue(key: string, value: FieldValue): FieldValue {
    if (key in this.state) {
      return this.state[key];
    }

    return value;
  }

  renderField = (value: FieldValue, key: string) => {
    switch (typeof value) {
      case 'string':
        return <Input
          onChange={this.handleChange}
          name={key}
          value={this.getValue(key, value) as string}
        />;
      case 'number':
        return <Input
          onChange={this.handleChange}
          name={key}
          type="number"
          value={this.getValue(key, value) as number}
        />;
      case 'boolean':
        return <Checkbox
          onChange={this.handleChange}
          checked={this.getValue(key, value) as boolean}
          name={key}
          value={key}
        />;
      default:
        return null;
    }
  }

  renderFormComponent = (value: FieldValue, key: string, prevKey?: string) => {
    const newKey = prevKey ? `${prevKey}.${key}` : key;

    return (
      <Row type="flex" align="middle">
        <Col>
          <label className="ConfigForm__label" htmlFor={key}>{key}</label>
        </Col>
        <Col span={8}>
          {this.renderField(value, newKey)}
        </Col>
      </Row>
    );
  }

  renderForm(config: IConfig, prevKey?: string) {
    if (!config) return;

    return Object.keys(config).map((key: string) => {
      const value = config[key];
      const isField = typeof value !== 'object';
      return (
        <Row key={key}>
          {!isField ? (
            <>
              <Col span={3}>{key}:</Col>
              <Col pull={2} span={19}>{this.renderForm(value as IConfig, key)}</Col>
            </>
          ) :
            this.renderFormComponent(value as FieldValue, key, prevKey)
          }
        </Row>
      );
    });
  }

  handleSaveConfig = (): void => {
    this.props.onSave(this.state);
  }

  handleUploadConfig = (): void => {
    this.props.onUpload(this.state);
  }

  render() {
    const { config, showSuccessMessage } = this.props;
    if (!config) return <h2>'Loading...'</h2>;
    return (
      <form className="ConfigForm">
        {this.renderForm(config)}
        {showSuccessMessage &&
        <span className="ConfigForm__success-msg">Config has been uploaded successfully</span>
        }
        <Row type="flex" justify="center">
          <Col span={5}>
            <Button type="primary" onClick={this.handleSaveConfig}>Save configuration</Button>
          </Col>
          <Col span={5}>
            <Button type="primary" onClick={this.handleUploadConfig}>Upload configuration</Button>
          </Col>
        </Row>
      </form>
    );
  }
}

export default ConfigForm;
