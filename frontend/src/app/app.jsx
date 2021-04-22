import React from 'react';
import {LoginPage} from './loginPage';
import {AdminDash} from './adminDash';
import { CreateAccount } from './createAccount';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NPODashboard } from './NPODashboard';
import { NPOProfile } from './NPOProfile';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={CreateAccount} />
          <Route exact path="/admin-dash" component={AdminDash} />
          <Route exact path="/npo/dashboard" component={NPODashboard} />
          <Route exact path="/npo/profile" component={NPOProfile}/>          
        </Switch>
      </Router>
    </>
  );
}

export default App;