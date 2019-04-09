import React, { Component } from 'react';
import './App.css';

// 导入框架 
import 'semantic-ui-css/semantic.min.css' 

import Login from './component/login/Login.jsx'
import Layout from './component/layout/Layout.jsx'
import List from './component/list/List.jsx'
import NotFound from './component/404/NotFound.jsx'



import { HashRouter,Route,Switch,Redirect } from 'react-router-dom'

class App extends Component {
  render() {
    return <HashRouter>
      <div id="root">
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/layout" component={Layout}/>
          <Route path="/lsit" component={List}/>
          <Redirect exact from="/" to="/login"/>
          <Route component={NotFound} />    
        </Switch>
      </div>
    </HashRouter>
  }
}

export default App;
