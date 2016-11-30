import React from 'react'
import {connect} from 'react-redux'
import DocumentTitle from 'react-document-title'
import {push} from 'redux-router'
import { Menu, Breadcrumb, Icon } from 'antd';
import styles from "./Navigation.less";
import titleImg from "./../../assets/images/title.png";
const SubMenu = Menu.SubMenu;
class MyComponent extends React.Component {
    constructor(props) {
        super(props)

    }

  onCollapseChange() {
    this.props.onCollapseChange();

  }

  handleClick(e) {
      this.props.menuDate.map((items, index) => {
        items.childrenMenu.map((childrenItems, childrenIndex) => {
          if(childrenItems.id==e.key){
            this.props.goLink(childrenItems);
            localStorage.path= JSON.stringify(childrenItems.id);
          }
        })
      })
    }

    handleLogOut() {
        this.props.handleLogOut()
    }
    render() {
	 const collapse = this.props.collapse;
		return (

			 <aside className="ant-layout-sider">
          <div className="ant-layout-logo">
          <img src={titleImg}/>
          </div>

           {this.props.menuDate.map((items, index) => {
                                    return (
                                      <span key={items.id}>

          {<Menu mode="inline" key={items.id+"menus"} theme="dark" onClick={this.handleClick.bind(this)}
          selectedKeys={[localStorage.path+'']}
          defaultOpenKeys={[items.id+"title"]}
           defaultSelectedKeys={[localStorage.path+'']}>
           <SubMenu key={items.id+"title"} title={<span><Icon type="user" />{items.name}</span>}>
            {items.childrenMenu.map((childitems, childindex) => {

                                    return (

                                        <Menu.Item key={childitems.id}>
                                        <Icon type={childitems.icon}/><span className="nav-text">{childitems.name}</span>
                                        </Menu.Item>
                                    )
                                })}
                          </SubMenu>

          </Menu>}

          </span>
                                    )
                                })}

          <div className="ant-aside-action" onClick={this.onCollapseChange.bind(this)}>
            {collapse ? <Icon type="right" /> : <Icon type="left" />}
          </div>
        </aside>


		)
    }

}

export default MyComponent
