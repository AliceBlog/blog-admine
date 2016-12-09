import React from 'react'
import {connect} from 'react-redux'
import DocumentTitle from 'react-document-title'
import {push} from 'redux-router'
import { Menu, Breadcrumb, Icon,Spin  } from 'antd';
import styles from "./AppContainer.less";
const SubMenu = Menu.SubMenu;
import Navigation from "./../components/Common/Navigation";
import Header from "./../components/Common/Header";
import {bindActionCreators} from 'redux'
import Login from "./Login";
import {logout, restoreFromToken} from '../actions/user'

export function AppContainer(Component){
const ManageContainer = React.createClass({

	getInitialState() {
    return {
      collapse: false,
			loading:false
    };
  },
  componentWillMount(){

		localStorage.path= JSON.stringify(this.props.menuDate[0].childrenMenu[0].id);
		this.props.menuDate.map((items, index) => {
          items.childrenMenu.map((childrenItems, childrenIndex) => {
            if(window.location.hash.indexOf(childrenItems.link)>-1){
              localStorage.path= JSON.stringify(childrenItems.id);
					  }

          })
        })
  const {
    user
  } = this.props
  if (user.get('token') && user.get('id')) {
    this.props.restoreFromToken(user.get('token'), user.get('id'))
  }
},
  onCollapseChange() {
    this.setState({
      collapse: !this.state.collapse,
    })
  },
  // localStorage.getItem('token')
  goLink(childrenItems){
     this.props.push({pathname:childrenItems.link});
  },
  handleLogout(){
    this.props.logout();
  },
	handleloading(data){
		this.setState({loading:data})
	},
	render: function() {
		 const collapse = this.state.collapse;
        if(this.props.user.get('loginState')==1){
      return (

        <DocumentTitle title="AliceのBlog">
            <div className={collapse ? "ant-layout-aside ant-layout-aside-collapse" : "ant-layout-aside"}>
            <Navigation menuDate={this.props.menuDate}
             onCollapseChange={this.onCollapseChange}
             goLink={this.goLink}
              collapse={this.state.collapse}></Navigation>
                      <div className="ant-layout-main">
                      <Header {...this.props} handleLogout={this.handleLogout}></Header>
                 {/* <Spin tip="Loading..." spinning={this.state.loading}> */}
                      <Component handleloading={this.handleloading}></Component>
 {/* </Spin> */}
                     </div>
                     </div>
        </DocumentTitle>

      )
    }else{
      return <Login></Login>
    }
	}
})

function mapStateToProps(state) {
		return {
    user: state.getIn(["user"]),
			"menuDate": [{
					"id": 1,
					"name": "博客管理",
					"icon": "caret-right",
					"childrenMenu": [{
						"id": 2,
            "name": "文章管理",
            "icon": "home",
            "link": "blog"
					}]

				}]
		}
	}

function mapDispatchToProps(dispatch) {
	return {
    push: bindActionCreators(push, dispatch),
     logout: bindActionCreators(logout, dispatch),
     restoreFromToken: bindActionCreators(restoreFromToken, dispatch),
	}
}

return connect(mapStateToProps, mapDispatchToProps)(ManageContainer)
}
