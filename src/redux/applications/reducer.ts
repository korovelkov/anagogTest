import {
  LOAD_APPLICATIONS,
  DELETE_APPLICATION,
  SELECT_APPLICATION,
  CREATE_APPLICATION,
  IApplicationsState,
  ApplicationActionTypes,
} from './types';

const initialState: IApplicationsState = {
  list: [],
  selected: '',
};

export default function (state = initialState, action: ApplicationActionTypes) {
  // we cant use destructuring here because of typescript bug
  switch (action.type) {
    case LOAD_APPLICATIONS:
      return {
        ...state,
        list: action.payload,
      };
    case DELETE_APPLICATION:
      return {
        ...state,
        list: state.list.filter(app => app.AppName !== action.payload),
        selected: '',
      };
    case SELECT_APPLICATION:
      return {
        ...state,
        selected: action.payload,
      };
    case CREATE_APPLICATION:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    default:
      return state;
  }
}
