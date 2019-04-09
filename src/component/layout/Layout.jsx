import React, { Component } from 'react'

import { Route, Link } from 'react-router-dom'

import { Grid, Icon } from 'semantic-ui-react'

import Home from '../home/Home.jsx'
import Info from '../info/Info.jsx'
import Chat from '../chat/Chat.jsx'
import Mine from '../mine/Mine.jsx'

//自己样式要最后引入,防止被第三方覆盖
import './Layout.css'

// 创建自定义路由子组件
const Menu = ({ nemuName, iconName, to, activeOnlyWhenExact }) => {
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      /* match 这是它内部的 代表默认选中 */
      children={({ match }) => {
        return (
          <Link to={to}>
            {/* <div className={match ? 'placeholder active' : 'placeholder '}></div> */}
            <div className={`placeholder ${match ? 'active' : ''}`}>
              <Icon name={iconName} />
              <div>{nemuName}</div>
            </div>
          </Link>
        )
      }}
    />
  )
}

export default class Layout extends Component {
  render() {
    return (
      <div>
        {/* 1.0路由部分 */}
        <div className="main-content">
          {/* exact精确匹配 */}
          <Route exact path="/layout" component={Home} />
          <Route path="/layout/info" component={Info} />
          <Route path="/layout/chat" component={Chat} />
          <Route path="/layout/mine" component={Mine} />
        </div>
        {/* 2.0自定义路由跳转 */}
        <div className="main-menu">
          <Grid centered padded>
            <Grid.Row divided columns={4}>
              <Grid.Column>
                {/* 使用子组件路由 */}
                <Menu
                  to="/layout"
                  activeOnlyWhenExact={true}
                  nemuName="首页"
                  iconName="user secret"
                />
              </Grid.Column>
              <Grid.Column>
                {/* 使用子组件路由 */}
                <Menu
                  to="/layout/info"
                  nemuName="咨询"
                  iconName="window restore"
                />
              </Grid.Column>
              <Grid.Column>
                {/* 使用子组件路由 */}
                <Menu
                  to="/layout/chat"
                  nemuName="微聊"
                  iconName="microchip"
                />
              </Grid.Column>
              <Grid.Column>
                {/* 使用子组件路由 */}
                <Menu
                  to="/layout/mine"
                  nemuName="我的"
                  iconName="window maximize"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    )
  }
}
