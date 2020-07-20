import Api from '../../api/Api';
import {
  LOAD_APPLICATIONS,
  DELETE_APPLICATION,
  SELECT_APPLICATION,
  CREATE_APPLICATION,
} from './types';

import { ThunkAction } from 'redux-thunk';
import { AppState } from '../index';
import { Action } from 'redux';

type ActionThunk = ThunkAction<void, AppState, null, Action<string>>;

export const loadApplications = (): ActionThunk => async (dispatch) => {
  try {
    const applications = await Api.getApps();

    dispatch({
      type: LOAD_APPLICATIONS,
      payload: applications,
    });
  } catch (e) {
    alert(e);
  }
};

export const deleteApplication = (appName: string): ActionThunk => async (dispatch) => {
  try {
    await Api.deleteApp(appName);

    dispatch({
      type: DELETE_APPLICATION,
      payload: appName,
    });
  } catch (e) {
    alert(e);
  }
};

export const selectApplication = (appName: string): ActionThunk => async (dispatch) => {
  dispatch({
    type: SELECT_APPLICATION,
    payload: appName,
  });
};

export const createApplication = (appName: string): ActionThunk => async (dispatch) => {
  try {
    const newApp = await Api.createApplication(appName);

    dispatch({
      type: CREATE_APPLICATION,
      payload: newApp,
    });

    return true;
  } catch (e) {
    alert(e);
    return false;
  }
};
