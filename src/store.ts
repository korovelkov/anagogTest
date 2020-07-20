import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './redux';

const isDev = process.env.NODE_ENV === 'development';

const middleware = applyMiddleware(thunk);

const devTools = (window as any)['devToolsExtension'] ?
  (window as any)['devToolsExtension']() : (f: any) => f;

export default (initialState: any) => createStore(
  rootReducer as any,
  initialState,
  ...[isDev ? compose(middleware, devTools) : middleware],
);
