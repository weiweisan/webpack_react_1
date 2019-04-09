import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

// 导入子组件
import Login from './components/login/Login.jsx'
import Layout from './components/layout/Layout.jsx'
import NotFound from './components/404/NotFound.jsx'

//导入semantic-ui-css
import 'semantic-ui-css/semantic.min.css'

import { HashRouter, Route,Switch,Redirect } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div id="root">
          <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/layout" component={Layout}/>
            <Redirect from="/" to="/login" />
            <Route component={NotFound}/>
          </Switch>
        </div>
      </HashRouter>
    )
  }
}

export default App
