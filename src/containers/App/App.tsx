import React from 'react';
import { Provider } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
import history from '../../utils/history';
import { HEADER_ROUTS } from '../../constants';

import Login from '../Login';
import ApplicationSelection from '../ApplicationSelection';
import ApplicationCreation from '../ApplicationCreation';
import EditConfiguration from '../EditConfiguration';
import EditUsers from '../EditUsers';
import Header from '../../components/Header';

import createStore from '../../store';
import './style.scss';

function App() {
  return (
    <Provider store={createStore({})}>
      <Router history={history}>
        <Route path={HEADER_ROUTS} component={Header} />
        <div className="App">
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/applicationSelection" component={ApplicationSelection}/>
            <Route path="/applicationCreation" component={ApplicationCreation}/>
            <Route path="/editConfiguration" component={EditConfiguration} />
            <Route path="/editUsers" component={EditUsers} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
