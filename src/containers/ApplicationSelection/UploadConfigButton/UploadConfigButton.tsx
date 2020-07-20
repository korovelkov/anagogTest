import React, { Component } from 'react';
import UploadFileButton from '../../../components/UploadFileButton';

import { History } from 'history';
import { IConfig } from '../../../redux/config/types';

interface IProps {
  isAppSelected: boolean;
  history: History;
  uploadConfig: (config: IConfig) => void;
}

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export default class UploadConfigButton extends Component<IProps, null> {
  onUploadConfig = (e: any): void => {
    if (!this.props.isAppSelected) {
      alert('Please choose Application name, version and build.');

      e.preventDefault();
      return;
    }
  }

  handleLoadJson = (e: any): void => {
    try {
      const config = JSON.parse(e.target.result);

      if (!config.AnagogDefaultConfig) {
        alert('Invalid config.');
        return;
      }

      this.props.uploadConfig(config.AnagogDefaultConfig);
      this.props.history.push('/editConfiguration');
    } catch (e) {
      alert('Error parsing JSON');
    }
  }

  handleUploadConfig = (e: InputEvent): void => {
    const reader = new FileReader();
    reader.onload = this.handleLoadJson;
    reader.onerror = () => alert('Error while reading file');
    reader.readAsText(e.target.files[0]);
  }

  render() {
    return <UploadFileButton
      onClick={this.onUploadConfig}
      type="primary"
      inputProps={{
        onChange: this.handleUploadConfig,
        accept: '.json',
        id: 'uploadConfig',
      }}
    >
      Upload Configuration
    </UploadFileButton>;
  }
}
