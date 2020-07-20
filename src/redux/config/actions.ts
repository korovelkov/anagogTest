import Api from '../../api/Api';
import set from 'lodash/set';
import defaultsDeep from 'lodash/defaultsDeep';
import { saveAs } from 'file-saver';
import {
  UPLOAD_CONFIG,
  LOAD_CONFIG,
  SAVE_CONFIG,
  UPDATE_CONFIG,
  IConfig,
  IConfigValues,
} from './types';

import { ThunkAction } from 'redux-thunk';
import { AppState } from '../index';
import { Action } from 'redux';

type ActionThunk = ThunkAction<void, AppState, null, Action<string>>;

function formatConfigValues(configValues: IConfig) {
  return Object.keys(configValues).reduce((acc, key) => {
    set(acc, key, configValues[key]);

    return acc;
  }, {});
}

export const uploadConfig = (config: IConfig): ActionThunk => (dispatch) => {
  dispatch({
    type: UPLOAD_CONFIG,
    payload: config,
  });
};

export const loadConfig = (appName: string): ActionThunk => async (dispatch) => {
  try {
    const config = await Api.loadConfig(appName);

    dispatch({
      type: LOAD_CONFIG,
      payload: config,
    });
  } catch (e) {
    alert(e);
  }
};

export const updateConfig = (configValues: IConfigValues): ActionThunk =>
  async (dispatch, getState) => {
    try {
      const config = defaultsDeep(formatConfigValues(configValues), getState().config.data);

      await Api.updateConfig(config);

      dispatch({
        type: UPDATE_CONFIG,
        payload: config,
      });
    } catch (e) {
      alert(e);
    }
  };

export const saveConfig = (configValues: IConfigValues): ActionThunk => (dispatch, getState) => {
  const config = formatConfigValues(configValues);
  const configFile = new File(
    [JSON.stringify(config)],
    'config.json',
    { type: 'application/json' },
  );

  saveAs(configFile);

  dispatch({
    type: SAVE_CONFIG,
    payload: defaultsDeep(config, getState().config.data),
  });
};
