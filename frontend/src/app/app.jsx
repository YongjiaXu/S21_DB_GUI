import React from 'react';
import { LoginPage } from './loginPage';
import { CreateAccount } from './createAccount';
import {AdminDash} from './adminDash';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {ROUTES} from '../routes';
import {Header} from './header';


function App() {
  return (
    <>

      <Router>
      <Header/>
        <Switch>
          {ROUTES.map((route,index)=><Route key={index} {...route} />)}
        </Switch>
      </Router>       
    </>
  );
}

export default App;

