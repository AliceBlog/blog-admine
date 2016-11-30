import React from 'react'
import {connect} from 'react-redux'
import DocumentTitle from 'react-document-title'
import {push} from 'redux-router'
import {Icon,message,Button,Input,Transfer,Modal } from 'antd';
import "react-md-editor/less/component.less";
import  "codemirror/lib/codemirror.css";
var Editor = require('react-md-editor');
var marked = require('marked');
import styles from "./add.less";
// const SubMenu = Menu.SubMenu;
Editor = require('react-md-editor');

class MyComponent extends React.Component {
    constructor(props) {
        super(props)
this.state={
  visible: true,
  mockData: [],
  targetKeys: [],
  code: "# 博客正文",
}
    }
    componentDidMount(){
      this.getMock();
      }
    showModal() {
       this.setState({
         visible: true,
       });
     }
     handleOk() {
       this.setState({
         visible: false,
       });
     }
     handleCancel() {
       this.setState({
         visible: false,
       });
       this.props.handleCancel();
     }
     updateCode (newCode) {
 		this.setState({
 			code: newCode
 		});
 	}
     getMock() {
         const targetKeys = [];
         const mockData = [];
         for (let i = 0; i < 20; i++) {
           const data = {
             key: i.toString(),
             title: `标签${i + 1}`,

           };
           mockData.push(data);
         }
         this.setState({ mockData, targetKeys });
       }
       filterOption(inputValue, option) {
         return option.description.indexOf(inputValue) > -1;
       }
       handleChange(targetKeys) {
         this.setState({ targetKeys });
       }
    render() {
      // console.log(this.props.user.getIn(["nickname"]));
      var preview = marked(this.state.code);
		return (

          <Modal className={`${styles.root}`} title="编辑博客" visible={this.props.visible}
           width="800px"
            onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
            okText="保存" cancelText="取消"
          >
          <div className="context">
          <h2>标题</h2>
          <Input placeholder="输入标题" />
          <div>
          <h2>标签</h2>
          <Transfer
dataSource={this.state.mockData}
showSearch
filterOption={this.filterOption.bind(this)}
targetKeys={this.state.targetKeys}
onChange={this.handleChange.bind(this)}
render={item => item.title}
/>
          </div>
          <h2>正文</h2>
          <div className="mdBox">
                  <div className="editor">
                    <Editor value={this.state.code} onChange={this.updateCode.bind(this)} />
                  </div>
                  <div className="preview" dangerouslySetInnerHTML={{__html: preview}} />
                </div>
</div>
          </Modal>

		)
    }

}

export default MyComponent
