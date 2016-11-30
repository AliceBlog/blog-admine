import React from 'react'
import {connect} from 'react-redux'
import DocumentTitle from 'react-document-title'
import {push} from 'redux-router'
class MyComponent extends React.Component {
    constructor(props) {
        super(props)
      
    }
	

    render() {
		return (
		<div className="ant-layout-footer">
           版权所有 © 2016 由负空间科技技术部支持
          </div>
				
		)
    }

}

export default MyComponent

