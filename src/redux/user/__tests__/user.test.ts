import Api from '../../../api/Api';
import {
  loadAppUsers,
  login,
  logout,
  addUser,
  deleteUsers,
} from '../actions';
import {
  USER_LOGIN,
  LOAD_APP_USERS,
  USER_LOGOUT,
  ADD_USER,
  DELETE_USERS,
} from '../types';
import reducer from '../reducer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockUser = { name: 'user1', id: '123' };

jest.mock('../../../api/Api', () => ({
  login: jest.fn((name) => ({ token: '123',  name })),
  logout: jest.fn(),
  loadUsers: jest.fn(() => [mockUser]),
  addUser: jest.fn(() => mockUser),
  deleteUsers: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
  name: '',
  loginError: '',
  usersList: [],
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('User tests', () => {
  it('login action', () => {
    const store = mockStore();

    return store.dispatch(login('admin', 'admin')).then(() => {
      expect(store.getActions()).toEqual([{
        type: USER_LOGIN,
        payload: { name: 'admin' },
      }]);

      expect(Api.login).toHaveBeenCalled();
    });
  });

  it('logout action', () => {
    const store = mockStore();

    return store.dispatch(logout()).then(() => {
      expect(store.getActions()).toEqual([{
        type: USER_LOGOUT,
      }]);

      expect(Api.logout).toHaveBeenCalled();
    });
  });

  it('loadAppUsers action', () => {
    const store = mockStore();

    return store.dispatch(loadAppUsers('testApp')).then(() => {
      expect(store.getActions()).toEqual([{
        type: LOAD_APP_USERS,
        payload: [mockUser],
      }]);

      expect(Api.loadUsers).toHaveBeenCalled();
    });
  });

  it('addUser action', () => {
    const store = mockStore();

    return store.dispatch(addUser('testApp', { name: mockUser.name })).then(() => {
      expect(store.getActions()).toEqual([{
        type: ADD_USER,
        payload: mockUser,
      }]);

      expect(Api.addUser).toHaveBeenCalled();
    });
  });

  it('deleteUsers action', () => {
    const store = mockStore();

    return store.dispatch(deleteUsers('app', ['123'])).then(() => {
      expect(store.getActions()).toEqual([{
        type: DELETE_USERS,
        payload: ['123'],
      }]);

      expect(Api.deleteUsers).toHaveBeenCalled();
    });
  });

  it('handle USER_LOGIN', () => {
    expect(reducer(undefined, {
      type: USER_LOGIN,
      payload: { name: 'user1' },
    })).toEqual({
      ...initialState,
      name: 'user1',
    });
  });

  it('handle USER_LOGOUT', () => {
    expect(reducer(undefined, {
      type: USER_LOGOUT,
    })).toEqual({
      ...initialState,
      name: '',
    });
  });

  it('handle LOAD_APP_USERS', () => {
    expect(reducer(undefined, {
      type: LOAD_APP_USERS,
      payload: [mockUser],
    })).toEqual({
      ...initialState,
      usersList: [mockUser],
    });
  });

  it('handle ADD_USER', () => {
    expect(reducer(undefined, {
      type: ADD_USER,
      payload: mockUser,
    })).toEqual({
      ...initialState,
      usersList: [mockUser],
    });
  });

  it('handle DELETE_USER', () => {
    const state = {
      ...initialState,
      usersList: [mockUser, { name: 'user2', id: 'mockId' }],
    };
    expect(reducer(state, {
      type: DELETE_USERS,
      payload: ['mockId'],
    })).toEqual({
      ...initialState,
      usersList: [mockUser],
    });
  });
});
