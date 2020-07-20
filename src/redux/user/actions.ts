import Api from '../../api/Api';
import history from '../../utils/history';

import {
  USER_LOGIN_FAIL,
  USER_LOGIN,
  USER_LOGOUT,
  LOAD_APP_USERS,
  ADD_USER,
  DELETE_USERS,
  INewUser,
} from './types';
import { TOKEN_KEY } from '../../constants';

import { Action } from 'redux';
import { AppState } from '../index';
import { ThunkAction } from 'redux-thunk';

type ActionThunk = ThunkAction<void, AppState, null, Action<string>>;

export const login = (name: string, password: string): ActionThunk => async (dispatch: any) => {
  try {
    const { token, ...user } = await Api.login(name, password);

    localStorage.setItem(TOKEN_KEY, token);

    dispatch({
      type: USER_LOGIN,
      payload: user,
    });
    history.push('/applicationSelection');
  } catch (e) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: {
        error: e,
      },
    });
  }
};

export const logout = (): ActionThunk => async (dispatch: any) => {
  try {
    await Api.logout();

    localStorage.removeItem(TOKEN_KEY);

    dispatch({ type: USER_LOGOUT });
    history.push('/');
  } catch (e) {
    alert(e);
  }
};

export const loadAppUsers = (appName: string): ActionThunk => async (dispatch) => {
  try {
    const users = await Api.loadUsers(appName);

    dispatch({
      type: LOAD_APP_USERS,
      payload: users,
    });
  } catch (e) {
    alert(e);
  }
};

export const addUser = (appName: string, user: INewUser): ActionThunk => async (dispatch) => {
  try {
    const newUser = await Api.addUser(appName, user);

    dispatch({
      type: ADD_USER,
      payload: newUser,
    });
  } catch (e) {
    alert(e);
  }
};

export const deleteUsers = (appName: string, ids: string[]): ActionThunk => async (dispatch) => {
  try {
    await Api.deleteUsers(appName, ids);

    dispatch({
      type: DELETE_USERS,
      payload: ids,
    });
  } catch (e) {
    alert(e);
  }
};
