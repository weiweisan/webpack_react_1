import React, { Component } from 'react'
import './App.css'

//导入semantic-ui-css
import 'semantic-ui-css/semantic.min.css'

// 导入子组件
import Login from './components/login/Login.jsx'
import Layout from './components/layout/Layout.jsx'
import NotFound from './components/404/NotFound.jsx'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div id="app">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/layout" component={Layout} />
            <Redirect from="/" to="/login" />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
