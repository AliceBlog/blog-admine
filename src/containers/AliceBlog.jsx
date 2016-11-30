import React from 'react'
import {connect} from 'react-redux'
import DocumentTitle from 'react-document-title'
import {push} from 'redux-router'
import { Breadcrumb, Icon,message,Button,Input,Table,Modal} from 'antd'
import styles from './AliceBlog.less'
import _ from 'underscore'
import {bindActionCreators} from 'redux'
import {toJS} from 'immutable'
import moment from 'moment'

import LocalizedModal from '../components/newBlog/add'

import Loading from '../components/Common/Loading'

let pageCount=0;

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `标题君 ${i}`,
    time:"2016-10-10",
    time1:"2016-10-10",
    status:"未发布",
    age: "简介",
    address: `正文. ${i}`,
  });
}
class MyComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state={
          selectedRowKeys: [],  // Check here to configure the default column
          loadStatus:false,//加载状态
          visible:false
        }
    }
    start() {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
          this.setState({
            selectedRowKeys: [],
            loading: false,
          });
        }, 1000);
      }
      onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
      }
    componentDidMount(){

      }

    componentWillReceiveProps(nextProps) {
    this.setState({loadStatus:false})
    }
    handleCancel() {
      this.setState({
        visible: false,
      });
    }
    handleOk() {
      this.setState({
        visible: false,
      });

    }
    handleEdit(){
      this.setState({
        visible: true,
      });
    }
  render() {
    const columns = [{
      title: '标题',
      dataIndex: 'name',
    }, {
      title: '简介',
      dataIndex: 'age',
    }, {
      title: '正文',
      dataIndex: 'address',
    }, {
      title: '发布时间',
      dataIndex: 'time',
    }, {
      title: '最后修改时间',
      dataIndex: 'time1',
    }, {
      title: '状态',
      dataIndex: 'status',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="#" onClick={this.handleEdit.bind(this)}>编辑</a>
          <span className="ant-divider" />
          <a href="#">删除</a>
          <span className="ant-divider" />
          <a href="#">（取消）发布</a>
          <span className="ant-divider" />
          <a href="#">预览</a>

        </span>
      ),
    }];
    const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
          selectedRowKeys,
          onChange: this.onSelectChange.bind(this),
        };
        const hasSelected = selectedRowKeys.length > 0;
	   return (
			<div className={`ant-layout-container ${styles.root}`}>
                <div className="ant-layout-content">

                <div className="tableBox">

                          <div className="topBtn">
                          <Button type="primary" onClick={this.start.bind(this)}
                            disabled={!hasSelected} loading={loading}
                          >发布</Button>

                          <Button type="primary" onClick={this.start.bind(this)}
                            disabled={!hasSelected} loading={loading}
                          >取消发布</Button>
                          <Button type="primary" onClick={this.start.bind(this)}
                            disabled={!hasSelected} loading={loading}
                          >删除</Button>
                          <Button type="primary">新增</Button>
                          </div>
                          <span style={{ marginLeft: 8 }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>

                        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
                      </div>


                {
                /*<Loading loadStatus={this.state.loadStatus}></Loading>*/}
            </div>
            <LocalizedModal visible={this.state.visible} handleCancel={this.handleCancel.bind(this)}
            handleOk={this.handleOk.bind(this)}/>
            </div>
		)
    }
}

function mapStateToProps(state) {
    return {
        // userList:state.getIn(["user","userList"]),
        // allCount:state.getIn(["user","usersCount"]),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // getUser:bindActionCreators(getUser, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyComponent)
