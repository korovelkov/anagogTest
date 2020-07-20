import {
  UPLOAD_CONFIG,
  LOAD_CONFIG,
  SAVE_CONFIG,
  UPDATE_CONFIG,
  IApplicationsState,
  ApplicationActionTypes,
} from './types';

const initialState: IApplicationsState = {
  data: null,
};

export default function (state = initialState, action: ApplicationActionTypes) {
  // we cant use destructuring here because of typescript bug
  switch (action.type) {
    case LOAD_CONFIG:
    case UPLOAD_CONFIG:
    case SAVE_CONFIG:
    case UPDATE_CONFIG:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
}
