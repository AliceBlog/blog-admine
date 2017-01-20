import React from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'
import { push } from 'redux-router'
import { Breadcrumb, Icon, message, Button, Input, Table, Modal, Tag } from 'antd'
import styles from './Blog.less'
import _ from 'underscore'
import { bindActionCreators } from 'redux'
import { toJS } from 'immutable'
import moment from 'moment'
import { getBlogList, getTagList, addTags, deleteTags, addArticle, deleteArticle, changeArticle } from '../actions/blog'
import LocalizedModal from '../components/newBlog/add'
import Loading from '../components/Common/Loading'

let pageCount = 0;

class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogList: [],
      selectedRowKeys: [],  // Check here to configure the default column
      loadStatus: false,//加载状态
      visible: false,
      tagList: [],
      blog: undefined
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
  componentDidMount() {
    this.props.getBlogList("pageCount:" + 10);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loadStatus: false, blogList: nextProps.blogList.list, tagList: nextProps.tagList.list })
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
  handleEdit(state) {
    this.setState({
      blog: state, visible: true
    });
  }
  getTagList() {
    this.props.getTagList("pageCount:" + 10)
  }
  handleAddTag(data) {
    let resule = [
      {
        "name": data,
        "description": ""
      }
    ]
    addTags(resule).then((data) => {
      if (data) {
        message.success('新增成功');
        this.props.getTagList("pageCount:" + 10)
      } else {
        message.error('新增失败');
      }
    })
  }
  handleDeleteTags(id) {
    deleteTags([id]).then((data) => {
      if (data) {
        message.success('删除成功');
        this.props.getTagList("pageCount:" + 10)
      } else {
        message.error('删除失败');
      }
    })
  }
  handleAddArticle(data) {
    addArticle(data).then((data) => {
      if (data) {
        message.success('新增成功');
        this.props.getBlogList("pageCount:" + 10)
        this.setState({ visible: false })
      } else {
        message.error('新增失败');
      }
    })
  }
  handleChangeArticle(data) {
    changeArticle(data).then((data) => {
      if (data) {
        message.success('修改成功');
        this.props.getBlogList("pageCount:" + 10)
        this.setState({ visible: false })
      } else {
        message.error('修改失败');
      }
    })
  }
  handleDelete(data) {
    deleteArticle(data).then((data) => {
      if (data) {
        message.success('删除成功');
        this.props.getBlogList("pageCount:" + 10)
        this.setState({ visible: false })
      } else {
        message.error('删除失败');
      }
    })
  }
  deleteArticleList() {
    let deleteArray = [];
    this.state.blogList.map((item, i) => {
      this.state.selectedRowKeys.map((select, index) => {
        if (select == i) {
          deleteArray.push(item.id)
        }
      })
    })
    this.setState({ selectedRowKeys: [] })
    this.handleDelete(deleteArray)

  }
  changeState(id, resule) {
    let data = [{
      id: id,
      article_status: resule == "ArticleStatusNULL" || resule == "ArticleStatusUnpublished" ? "ArticleStatusPublished" : "ArticleStatusUnpublished"
    }]
    changeArticle(data).then((data) => {
      if (data) {
        message.success('修改成功');
        this.props.getBlogList("pageCount:" + 10)
        this.setState({ visible: false })
      } else {
        message.error('修改失败');
      }
    })
  }
  render() {
    const columns = [{
      title: '标题',
      dataIndex: 'title',
      key: 'title'
    }, {
      title: '简介',
      dataIndex: 'description',
      key: 'description',
      width: 200,
      render: (text, record) => {
        return (<div className="description">{text}</div>)
      }
    }, {
      title: '标签',
      width: 200,
      dataIndex: 'tags',
      key: 'tags',
      render: (text, record) => {
        return (
          <div className="content">{text.map(tag =>
            <Tag key={tag.id}>
              {tag.name}
            </Tag>
          )}</div>)
      }
    }, {
      title: '发布时间',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text, record) => {
        let newDate = new Date(text)
        return (<span>{moment(newDate).format('YYYY-MM-DD HH:mm:ss')}</span>)
      }
    }, {
      title: '最后修改时间',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (text, record) => {
        let newDate = new Date(text)
        return (<span>{moment(newDate).format('YYYY-MM-DD HH:mm:ss')}</span>)
      }
    }, {
      title: '状态',
      dataIndex: 'article_status',
      key: 'article_status',
      render: (text, record) => {

        return (<span>{text == "ArticleStatusNULL" || text == "ArticleStatusUnpublished" ? "未发布" : "发布"}</span>)
      }
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="#" onClick={this.handleEdit.bind(this, record)}>编辑</a>
          <span className="ant-divider" />
          <a href="#" onClick={this.handleDelete.bind(this, [record.id])}>删除</a>
          <span className="ant-divider" />
          <a href="#" onClick={this.changeState.bind(this, record.id, record.article_status)}>{record.article_status == "ArticleStatusNULL" || record.article_status == "ArticleStatusUnpublished" ? "发布" : "撤回"}</a>
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
                >批量发布</Button>
              <Button type="primary" onClick={this.start.bind(this)}
                disabled={!hasSelected} loading={loading}
                >取消发布</Button>
              <Button type="primary" onClick={this.deleteArticleList.bind(this)}
                disabled={!hasSelected} loading={loading}
                >批量删除</Button>
              <Button type="primary" onClick={this.handleEdit.bind(this, undefined)}>新增</Button>
            </div>
            <span style={{ marginLeft: 8 }}>{hasSelected ? `已选择 ${selectedRowKeys.length} 条文章` : ''}</span>

            <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.blogList} />
          </div>


          {
                /*<Loading loadStatus={this.state.loadStatus}></Loading>*/}
        </div>
        <LocalizedModal
          blog={this.state.blog}
          changeArticle={this.handleChangeArticle.bind(this)}
          addArticle={this.handleAddArticle.bind(this)}
          deleteTags={this.handleDeleteTags.bind(this)}
          tagList={this.state.tagList}
          addTag={this.handleAddTag.bind(this)} getTagList={this.getTagList.bind(this)} visible={this.state.visible} handleCancel={this.handleCancel.bind(this)}
          handleOk={this.handleOk.bind(this)} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    blogList: state.getIn(["blog", "blogList"]),
    tagList: state.getIn(["blog", "tagList"]),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getBlogList: bindActionCreators(getBlogList, dispatch),
    getTagList: bindActionCreators(getTagList, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyComponent)
