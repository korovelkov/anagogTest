export const UPLOAD_CONFIG = 'UPLOAD_CONFIG';
export const LOAD_CONFIG = 'LOAD_CONFIG';
export const SAVE_CONFIG = 'SAVE_CONFIG';
export const UPDATE_CONFIG = 'UPDATE_CONFIG';

export interface IConfig {
  [key: string]: string | boolean | number | object;
}

export interface IConfigValues {
  [key: string]: string | boolean | number;
}

export interface IUploadConfig {
  type: typeof UPLOAD_CONFIG;
  payload: IConfig;
}

export interface ILoadConfig {
  type: typeof LOAD_CONFIG;
  payload: IConfig;
}

export interface ISaveConfig {
  type: typeof SAVE_CONFIG;
  payload: IConfig;
}

export interface IUpdateConfig {
  type: typeof UPDATE_CONFIG;
  payload: IConfig;
}

export type ApplicationActionTypes =
  IUploadConfig |
  ILoadConfig |
  ISaveConfig |
  IUpdateConfig;

export interface IApplicationsState {
  data: IConfig;
}
