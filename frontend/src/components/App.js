import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import { HashRouter as Router, BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Provider } from "react-redux";
import store from "../store";

import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic';

import Leads from "./leads/Leads";
import Forms from "./leads/Forms";
import Header from "./layout/Header";
import Alerts from "./layout/alerts";
import ReactDOM from 'react-dom';

import PrivateRoute from './common/PrivateRoute';

import Passtoken from './accounts/passtoken';
import Passreset from './accounts/passreset';
import Login from './accounts/Login';
import Register from './accounts/Register';
import { loadUser } from '../actions/auth';

//Alert Options
const alertOptions = {
  timeout: 3000,
  offset: '30px',
  position: positions.BOTTOM_CENTER,
};

class Dashboard extends Component {
  render() {
    return(
      <div>
        <Forms />
        <Leads />
      </div>
    )
  }
}

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
              <Fragment>
                <Header />
                <Alerts />
                <Switch>
                  <Route exact path='/' component={Dashboard} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/passreset' component={Passreset} />
                  <Route path="/Passtoken" component={Passtoken}/>
                </Switch>
              </Fragment>
            </Router>
          </AlertProvider>
      </Provider>
    );
  }
}

export default App;

const container = document.getElementById("app");

ReactDOM.render(<App />, container);
