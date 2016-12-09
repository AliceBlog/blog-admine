import React,{ PropTypes }  from 'react'
import {connect} from 'react-redux'
import DocumentTitle from 'react-document-title'
import {push} from 'redux-router'
import { Form, Input, Button, Row, Col, notification ,message} from 'antd'
import styles from "./Login.less"
import logo from "./../assets/images/title.png"
import {login} from '../actions/user'
import {bindActionCreators} from 'redux'
const FormItem = Form.Item
const propTypes = {
  user: PropTypes.string,
  loggingIn: PropTypes.bool,
  loginErrors: PropTypes.string
};

const contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};
class MyComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state={
          userNameValue:'Jermine',
          passwordValue:"123456"

        }

    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.user.get('loginState') !== this.props.user.get('loginState')) {
   switch (nextProps.user.get('loginState')) {
    case 0:
        message.info('正在验证');
      break;
    case 1:
      message.success('登录成功');
      if(window.location.hash.indexOf("login")>-1){
        this.props.push("/setIndex");
      }
      break;
      case 6:
        message.error(nextProps.user.get('massage'));
        break;
    default:
    message.error('登录失败');
      break;
  }
}

  }

  handleSubmit (e) {
    e.preventDefault()
    if(this.state.userNameValue==""){
      message.error('用户名不得为空');
    }else if (this.state.passwordValue=="") {
      message.error('密码不得为空');
    }else{
      message.info('正在验证');
      this.props.login(this.state.userNameValue,this.state.passwordValue);
    }
  }
  handleUserName(e){
    this.setState({
    userNameValue: e.target.value,
  });
  }
  handlePassword(e){
    this.setState({
    passwordValue: e.target.value,
  });
  }
    render() {
const { getFieldDecorator, getFieldError, isFieldValidating } = this.props.form;
// 用户名验证
  const nameProps = getFieldDecorator('name', {
    rules: [
      { required: true, min: 1, message: '请填写用户名' }
    ],
  });
  // 密码验证
  const passwdProps = getFieldDecorator('passwd', {
    rules: [
      { required: true, whitespace: true, message: '请填写密码' }
    ],
  });
	return (

		<Row className="login-row" type="flex" justify="space-around" align="middle">
        <Col span="8">
        <img src={logo}/>
          <Form horizontal onSubmit={this.handleSubmit.bind(this)} className="login-form">
            <FormItem
              label='用户名：'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
              hasFeedback
            >
              <Input {...nameProps} placeholder='xu@ngs.tech' onChange={this.handleUserName.bind(this)} value={this.state.userNameValue}/>
            </FormItem>
            <FormItem
              label='密码：'
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 14 }}
              hasFeedback
            >
              <Input {...passwdProps} type='password' placeholder='123456' onChange={this.handlePassword.bind(this)} value={this.state.passwordValue}/>
            </FormItem>
            <Row>
              <Col span='16' offset='10'>
                <Button type='primary' htmlType='submit'>确定</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
		)
    }

}

MyComponent = Form.create()(MyComponent);

  function mapStateToProps(state) {
  	return {
  		user: state.getIn(["user"])
  	}
  }

  function mapDispatchToProps(dispatch) {
  	return {
  		push: bindActionCreators(push, dispatch),
  		login: bindActionCreators(login, dispatch),
  	}
  }

  export default connect(mapStateToProps, mapDispatchToProps)(MyComponent)
