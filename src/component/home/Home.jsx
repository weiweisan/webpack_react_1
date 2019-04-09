import React, { Component } from 'react'

// 导入ul框架
import {
  Input,
  Icon,
  Dimmer,
  Loader,
  Grid,
  Item,
  Button
} from 'semantic-ui-react'
// 导入axios
import axios from 'axios'

import './Home.css'

// 导入轮播图
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'

export default class Home extends Component {
  constructor() {
    super()

    this.state = {
      swipers: [], // 轮播图
      menus: [], // 菜单
      infos: [], // 咨询
      faqs: [], // 问答
      houses: [], // 房屋列表
      isLoading: true // 正在加载中...
    }
  }
  async componentWillMount() {
    const result = await Promise.all([
      axios.post('homes/swipe'),
      axios.post('homes/menu'),
      axios.post('homes/info'),
      axios.post('homes/faq'),
      axios.post('Homes/house')
    ])

    this.setState({
      swipers: result[0].data.data.list,
      menus: result[1].data.data.list,
      infos: result[2].data.data.list,
      faqs: result[3].data.data.list,
      houses: result[4].data.data.list,
      // 等他数据回来后给它设置为false
      isLoading: false
    })
    console.log(result)
  }

  // 处理菜单的点击
  handleMenuClick = menuName => {
    console.log(menuName)
    switch (menuName) {
      case '二手房':
        this.props.history.push('/list', { menuName, home_type: 1 })
        break
      case '新房':
        this.props.history.push('/list', { menuName, home_type: 2 })
        break
      case '租房':
        this.props.history.push('/list', { menuName, home_type: 3 })
        break
      case '海外':
        this.props.history.push('/list', { menuName, home_type: 4 })
        break
      case '地图找房':
        this.props.history.push('/abc')
        break

      default:
        break
    }
  }

  render() {
    // 菜单
    const Menus = ({ menus }) => (
      <Grid padded>
        <Grid.Row columns={4}>
          {menus.map(item => {
            return (
              <Grid.Column
                onClick={() => {
                  this.handleMenuClick(item.menu_name)
                }}
                key={item.id}
              >
                {/* 图标 */}
                <div className="home-menu-item">
                  <Icon name="home" size="big" />
                </div>
                {/* 文字 */}
                <div style={{ marginTop: 5 }}>{item.menu_name}</div>
              </Grid.Column>
            )
          })}
        </Grid.Row>
      </Grid>
    )

    // 咨询
    const Infos = ({ infos }) => {
      return (
        <div className="home-msg">
          <Item.Group unstackable>
            <Item className="home-msg-img">
              <Item.Image
                size="small"
                src="http://47.96.21.88:8086/public/zixun.png"
              />
              <Item.Content>
                {infos.map(item => {
                  return (
                    <Item.Header key={item.id}>
                      <span>限购 ●</span>
                      <span>{item.info_title}</span>
                    </Item.Header>
                  )
                })}
                <div className="home-msg-more">
                  <Icon name="angle right" size="big" />
                </div>
              </Item.Content>
            </Item>
          </Item.Group>
        </div>
      )
    }

    // 问答
    const Faqs = ({ faqs }) => (
      <div className="home-ask">
        <div className="home-ask-title">好客问答</div>
        <ul>
          {faqs.map(item => {
            return (
              <li key={item.question_id}>
                <div>
                  <Icon name="question circle outline" />
                  <span>{item.question_name}</span>
                </div>
                <div>
                  {item.question_tag.split(',').map((subitem, index) => {
                    return (
                      <Button key={index} basic color="green">
                        {subitem}
                      </Button>
                    )
                  })}
                  <div>
                    {item.atime} ● <Icon name="comment alternate outline" />
                    {item.qnum}
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )

    // 房屋列表
    const Houses = ({ houses }) => {
      // 1. 过滤出home_type=1 最新开盘的数据
      const newsHouses = houses.filter(item => item.home_type === 1)

      // 2. 二手精选
      const oldHouses = houses.filter(item => item.home_type === 2)

      // 3. 热门房源
      const hotHouses = houses.filter(item => item.home_type === 3)

      return (
        <div>
          <div className="home-hire-title">最新开盘</div>
          <Item.Group unstackable>
            {newsHouses.map(item => {
              return (
                <Item key={item.id}>
                  <Item.Image
                    size="tiny"
                    src="http://47.96.21.88:8086/public/home.png"
                  />
                  <Item.Content>
                    <Item.Header>{item.home_name}</Item.Header>
                    <Item.Meta>{item.home_desc}</Item.Meta>
                    <Item.Description>
                      {item.home_tags.split(',').map((subitem, index) => {
                        return (
                          <Button key={index} basic color="green">
                            {subitem}
                          </Button>
                        )
                      })}
                    </Item.Description>
                    <Item.Description>
                      <span>{item.home_price}</span>
                    </Item.Description>
                  </Item.Content>
                </Item>
              )
            })}
          </Item.Group>
          <div className="home-hire-title">二手精选</div>
          <Item.Group unstackable>
            {oldHouses.map(item => {
              return (
                <Item key={item.id}>
                  <Item.Image
                    size="tiny"
                    src="http://47.96.21.88:8086/public/home.png"
                  />

                  <Item.Content>
                    <Item.Header>{item.home_name}</Item.Header>
                    <Item.Meta>{item.home_desc}</Item.Meta>
                    <Item.Description>
                      {item.home_tags.split(',').map((subitem, index) => {
                        return (
                          <Button key={index} basic color="green">
                            {subitem}
                          </Button>
                        )
                      })}
                    </Item.Description>
                    <Item.Description>
                      <span>{item.home_price}</span>
                    </Item.Description>
                  </Item.Content>
                </Item>
              )
            })}
          </Item.Group>
          <div className="home-hire-title">热门房源</div>
          <Item.Group unstackable>
            {hotHouses.map(item => {
              return (
                <Item key={item.id}>
                  <Item.Image
                    size="tiny"
                    src="http://47.96.21.88:8086/public/home.png"
                  />
                  <Item.Content>
                    <Item.Header>{item.home_name}</Item.Header>
                    <Item.Meta>{item.home_desc}</Item.Meta>
                    <Item.Description>
                      {item.home_tags.split(',').map((subitem, index) => {
                        return (
                          <Button key={index} basic color="green">
                            {subitem}
                          </Button>
                        )
                      })}
                    </Item.Description>
                    <Item.Description>
                      <span>{item.home_price}</span>
                    </Item.Description>
                  </Item.Content>
                </Item>
              )
            })}
          </Item.Group>
        </div>
      )
    }

    const { isLoading, swipers, menus, infos, faqs, houses } = this.state
    return (
      <div className="home-container">
        {/* 1.0 搜索框 */}
        <div className="home-topbar">
          <Input
            fluid
            icon={{ name: 'search', circular: true, link: true }}
            placeholder="搜房源..."
          />
        </div>
        {/* 2.0 Dimmer加载器 */}
        <Dimmer active={isLoading} inverted>
          <Loader>正在加载中...</Loader>
        </Dimmer>
        {/* 3.0 内容区域 */}
        <div className="home-content">
          {/* 3.1 轮播图 */}
          <ImageGallery
            showThumbnails={false}
            lozyLoad={true}
            items={swipers}
          />
          {/* 3.2菜单 */}
          <Menus menus={menus} />
          {/* 3.3咨询 */}
          <Infos infos={infos} />
          {/* 3.4 问答 */}
          <Faqs faqs={faqs} />
          {/* 3.5 房屋列表 */}
          <Houses houses={houses} />
        </div>
      </div>
    )
  }
}
