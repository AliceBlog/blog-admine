import React from 'react'
import {connect} from 'react-redux'
import DocumentTitle from 'react-document-title'
import {push} from 'redux-router'
import { Menu, Breadcrumb, Icon } from 'antd';
import styles from "./Header.less";
const SubMenu = Menu.SubMenu;
class MyComponent extends React.Component {
    constructor(props) {
        super(props)

    }
handleLogout(){
  this.props.handleLogout();
}

    render() {
      // console.log(this.props.user.getIn(["nickname"]));
		return (
		<div className="ant-layout-header">
      <div className="userInfo">{this.props.user.getIn(["nickname"])?this.props.user.getIn(["nickname"]):"亲"},欢迎您! <a onClick={this.handleLogout.bind(this)}><Icon type="poweroff" />退出登录</a></div>
    </div>

		)
    }

}

export default MyComponent
