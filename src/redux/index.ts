import { combineReducers } from 'redux';

import user from './user/reducer';
import applications from './applications/reducer';
import config from './config/reducer';

const rootReducer = combineReducers({
  user,
  applications,
  config,
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;
