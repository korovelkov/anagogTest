import Api from '../../../api/Api';
import {
  loadConfig,
  updateConfig,
  saveConfig,
  uploadConfig,
} from '../actions';
import {
  UPDATE_CONFIG,
  UPLOAD_CONFIG,
  SAVE_CONFIG,
  LOAD_CONFIG,
} from '../types';
import reducer from '../reducer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockConfig = {
  Metadata: {
    Build: 10,
    Comment: 'Update URLs to staging and change path of schedule and profile',

    Version: '2018-12-18 13:00',
  },
};

const mockConfigValues = {
  'Metadata.Build': 10,
  'Metadata.Version': '2018-12-18 13:00',
  'Metadata.Comment': 'Update URLs to staging and change path of schedule and profile',
}

jest.mock('../../../api/Api', () => ({
  loadConfig: jest.fn(() => mockConfig),
  updateConfig: jest.fn((config) => config),
}));

jest.mock('file-saver', () => ({
  saveAs: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
  config: {
    data: null,
  },
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Config tests', () => {
  it('loadConfig action', () => {
    const store = mockStore(initialState);

    return store.dispatch(loadConfig('appName')).then(() => {
      expect(store.getActions()).toEqual([{
        type: LOAD_CONFIG,
        payload: mockConfig,
      }]);

      expect(Api.loadConfig).toHaveBeenCalled();
    });
  });

  it('uploadConfig action', () => {
    const store = mockStore(initialState);

    store.dispatch(uploadConfig(mockConfig))
    expect(store.getActions()).toEqual([{
      type: UPLOAD_CONFIG,
      payload: mockConfig,
    }]);
  });

  it('updateConfig action', () => {
    const store = mockStore(initialState);

    return store.dispatch(updateConfig(mockConfigValues)).then(() => {
      expect(store.getActions()).toEqual([{
        type: UPDATE_CONFIG,
        payload: mockConfig,
      }]);

      expect(Api.updateConfig).toHaveBeenCalled();
    });
  });

  it('saveConfig action', () => {
    const store = mockStore(initialState);

    store.dispatch(saveConfig(mockConfigValues));

    expect(store.getActions()).toEqual([{
      type: SAVE_CONFIG,
      payload: mockConfig,
    }]);
  });

  it('handle LOAD_CONFIG', () => {
    expect(reducer(undefined, {
      type: LOAD_CONFIG,
      payload: mockConfig,
    })).toEqual({
      data: mockConfig,
    });
  });

  it('handle UPLOAD_CONFIG', () => {
    expect(reducer(undefined, {
      type: UPLOAD_CONFIG,
      payload: mockConfig,
    })).toEqual({
      data: mockConfig,
    });
  });

  it('handle UPDATE_CONFIG', () => {
    expect(reducer(undefined, {
      type: UPDATE_CONFIG,
      payload: mockConfig,
    })).toEqual({
      data: mockConfig,
    });
  });

  it('handle SAVE_CONFIG', () => {
    expect(reducer(undefined, {
      type: SAVE_CONFIG,
      payload: mockConfig,
    })).toEqual({
      data: mockConfig,
    });
  });
});
