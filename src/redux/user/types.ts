export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL';
export const USER_LOGOUT = 'USER_LOGOUT';
export const LOAD_APP_USERS = 'LOAD_APP_USERS';
export const ADD_USER = 'ADD_USER';
export const DELETE_USERS = 'DELETE_USERS';

export interface ILogin {
  type: typeof USER_LOGIN;
  payload: {
    name: string;
  };
}

export interface ILoginFailed {
  type: typeof USER_LOGIN_FAIL;
  payload: {
    error: string;
  };
}

export interface ILogout {
  type: typeof USER_LOGOUT;
}

export interface ILoadAppUsers {
  type: typeof LOAD_APP_USERS;
  payload: IUser;
}

export interface IAddUser {
  type: typeof ADD_USER;
  payload: IUser;
}

export interface IDeleteUsers {
  type: typeof DELETE_USERS;
  payload: string[];
}

export type UserActionTypes =
  ILogin |
  ILoginFailed |
  ILogout |
  ILoadAppUsers |
  IAddUser |
  IDeleteUsers;

export interface IUser {
  name: string;
  id: string;
}

export interface INewUser {
  name: string;
  updateU?: boolean;
  deleteU?: boolean;
  addU?: boolean;
}

export interface IUserState {
  name: string;
  loginError: string;
  usersList: IUser[];
}
