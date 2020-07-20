import Api from '../../../api/Api';
import {
  selectApplication,
  loadApplications,
  createApplication,
  deleteApplication,
} from '../actions';
import {
  SELECT_APPLICATION,
  LOAD_APPLICATIONS,
  DELETE_APPLICATION,
  CREATE_APPLICATION,
} from '../types';
import reducer from '../reducer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockApp = {
  AppName: 'testApp',
  Versions: [{
    Builds: [{ Build: 1, Comment: 'comm' }],
    ActiveBuild: 1,
    LastBuild: 1,
    Version: '1',
  }],
};

jest.mock('../../../api/Api', () => ({
  getApps: jest.fn(() => [mockApp]),
  deleteApp: jest.fn(),
  createApplication: jest.fn(() => mockApp),
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
  applications: {
    list: [],
    selected: '',
  },
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Applications tests', () => {
  it('selectApp action', () => {
    const store = mockStore();

    store.dispatch(selectApplication('testApp'));
    expect(store.getActions()).toEqual([{
      type: SELECT_APPLICATION,
      payload: 'testApp',
    }]);
  });

  it('loadApp action', () => {
    const store = mockStore();

    return store.dispatch(loadApplications()).then(() => {
      expect(store.getActions()).toEqual([{
        type: LOAD_APPLICATIONS,
        payload: [mockApp],
      }]);

      expect(Api.getApps).toHaveBeenCalled();
    });
  });

  it('createApp action', () => {
    const store = mockStore();

    return store.dispatch(createApplication('testApp')).then(() => {
      expect(store.getActions()).toEqual([{
        type: CREATE_APPLICATION,
        payload: mockApp,
      }]);

      expect(Api.createApplication).toHaveBeenCalled();
    });
  });

  it('deleteApp action', () => {
    const store = mockStore();

    return store.dispatch(deleteApplication('testApp')).then(() => {
      expect(store.getActions()).toEqual([{
        type: DELETE_APPLICATION,
        payload: 'testApp',
      }]);

      expect(Api.deleteApp).toHaveBeenCalled();
    });
  });

  it('handle LOAD_APPLICATIONS', () => {
    expect(reducer(undefined, {
      type: LOAD_APPLICATIONS,
      payload: [mockApp],
    })).toEqual({
      ...initialState.applications,
      list: [mockApp],
    });
  });

  it('handle SELECT_APPLICATION', () => {
    expect(reducer(undefined, {
      type: SELECT_APPLICATION,
      payload: 'app',
    })).toEqual({
      ...initialState.applications,
      selected: 'app',
    });
  });

  it('handle CREATE_APPLICATION', () => {
    expect(reducer(undefined, {
      type: CREATE_APPLICATION,
      payload: mockApp,
    })).toEqual({
      ...initialState.applications,
      list: [mockApp],
    });
  });

  it('handle DELETE_APPLICATION', () => {
    expect(reducer({
      ...initialState.applications,
      list: [mockApp],
    }, {
      type: DELETE_APPLICATION,
      payload: 'testApp',
    })).toEqual({
      ...initialState.applications,
      list: [],
    });
  });
});
