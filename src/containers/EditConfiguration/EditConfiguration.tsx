import React, { Component } from 'react';
import { connect } from 'react-redux';

import ConfigForm from './ConfigForm';
import { updateConfig, loadConfig, saveConfig } from '../../redux/config/actions';

import { History } from 'history';
import { AppState } from '../../redux';
import { IConfig } from '../../redux/config/types';

import './style.scss';

interface IState {
  uploadedConfig: boolean;
}

interface IProps {
  history: History;
  selectedApp: string;
  config: IConfig;
  loadConfig: (name: string) => void;
  updateConfig: (config: IConfig) => void;
  saveConfig: (config: IConfig) => void;
}

class EditConfiguration extends Component<IProps, IState> {
  state: IState = {
    uploadedConfig: false,
  };

  componentDidMount(): void {
    const { selectedApp, history } = this.props;
    if (!selectedApp) {
      history.push('/applicationSelection');
      return;
    }
    this.props.loadConfig(selectedApp);
  }

  onSaveConfig = (values: IConfig): void => {
    this.props.saveConfig(values);
  }

  onUploadConfig = async (values: IConfig): Promise<void> => {
    await this.props.updateConfig(values);
    this.setState({
      uploadedConfig: true,
    });
  }

  render() {
    const { selectedApp, config } = this.props;
    return (
      <div className="EditConfiguration">
        <h1 className="EditConfiguration__title">Edit Application Configuration</h1>
        <h5 className="EditConfiguration__title">{selectedApp}</h5>
        <ConfigForm
          onUpload={this.onUploadConfig}
          onSave={this.onSaveConfig}
          config={config}
          showSuccessMessage={this.state.uploadedConfig}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ applications, config }: AppState) => ({
  selectedApp: applications.selected,
  config: config.data,
});

const mapDispatchToProps = { updateConfig, saveConfig, loadConfig };

export default connect(mapStateToProps, mapDispatchToProps)(EditConfiguration);
