import {
  USER_LOGIN,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  LOAD_APP_USERS,
  ADD_USER,
  DELETE_USERS,
  UserActionTypes,
  IUserState,
} from './types';

const initialState: IUserState = {
  name: '',
  loginError: '',
  usersList: [],
};

export default function (state = initialState, action: UserActionTypes) {
  // we cant use destructuring here because of typescript bug
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        ...action.payload,
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        loginError: action.payload.error,
      };
    case LOAD_APP_USERS:
      return {
        ...state,
        usersList: action.payload,
      };
    case ADD_USER:
      return {
        ...state,
        usersList: [...state.usersList, action.payload],
      };
    case DELETE_USERS:
      return {
        ...state,
        usersList: state.usersList.filter(user => action.payload.indexOf(user.id) === -1),
      };
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
}
