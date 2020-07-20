export const LOAD_APPLICATIONS = 'LOAD_APPLICATIONS';
export const DELETE_APPLICATION = 'DELETE_APPLICATION';
export const SELECT_APPLICATION = 'SELECT_APPLICATION';
export const CREATE_APPLICATION = 'CREATE_APPLICATION';

export interface IApplication {
  AppName: string;
  Versions: IVersion[];
}

export interface IVersion {
  Version: string;
  ActiveBuild: number;
  LastBuild: number;
  Builds: IBuild[];
}

export interface IBuild {
  Build: number;
  Comment: string;
}

export interface ILoadApplications {
  type: typeof LOAD_APPLICATIONS;
  payload: IApplication[];
}

export interface IDeleteApplication {
  type: typeof DELETE_APPLICATION;
  payload: string;
}

export interface ISelectApplication {
  type: typeof SELECT_APPLICATION;
  payload: string;
}

export interface ICreateApplication {
  type: typeof CREATE_APPLICATION;
  payload: IApplication;
}

export type ApplicationActionTypes =
  ILoadApplications |
  IDeleteApplication |
  ISelectApplication |
  ICreateApplication;

export interface IApplicationsState {
  list: IApplication[];
  selected: string;
}
