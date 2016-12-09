import React from 'react'
import { connect } from 'react-redux'
import DocumentTitle from 'react-document-title'
import { push } from 'redux-router'
import { Icon, message, Button, Input, Transfer, Modal, Tabs, Tag } from 'antd';
import "react-md-editor/less/component.less";
import "codemirror/lib/codemirror.css";
var Editor = require('react-md-editor');
var marked = require('marked');
import styles from "./add.less";
import MyEditor from "./MyEditor"
// const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const Search = Input.Search;
Editor = require('react-md-editor');
var markdownString = '```js\n console.log("hello"); \n```';
// marked.setOptions({
//   highlight: function (code, lang, callback) {
//     require('pygmentize-bundled')({ lang: lang, format: 'html' }, code, function (err, result) {
//       callback(err, result.toString());
//     });
//   }
// });

// Using async version of marked 
marked(markdownString, function (err, content) {
  if (err) throw err;
  console.log(content);
});

// Synchronous highlighting with highlight.js 
marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});
// let index = 3;
class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true,
      tags: [],
      tagsList: [],
      tagBox: {},
      tagLibrary: false,
      newTag: false,
      addInputValue: "",
      titleValue: this.props.blog ? this.props.blog.title : "",
      descValue: this.props.blog ? this.props.blog.description : "",
      keywords: this.props.blog ? this.props.key_words : "",
      code: "# 博客正文",
      init:true
    }
  }
  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {
    if ((nextProps.blog && this.props.blog && this.props.blog.id != nextProps.blog.id) || !this.props.blog && nextProps.blog) {
      this.setState({
        titleValue: nextProps.blog ? nextProps.blog.title : "",
        descValue: nextProps.blog ? nextProps.blog.description : "",
        keywords: nextProps.blog ? nextProps.blog.key_words : "",
        code: nextProps.blog ? nextProps.blog.content : "# 博客正文",
      })
    }else if(this.state.init){
      this.setState({
        titleValue:  "",
        descValue: "",
        keywords:"",
        code: "# 博客正文",
      })
    }
    this.setState({
      tagsList: nextProps.tagsList ? nextProps.tagsList : [],
      init:true

    })
  }
  showModal() {
    this.setState({
      visible: true,
    });
  }
  handleOk() {
    let tags = []
    this.state.tags.map((item, i) => {
      tags.push(item.id)
    })
    let article = [{
      "title": this.state.titleValue,
      "key_words": this.state.keywords.length == 0 ? "博客" : this.state.keywords,
      "description": this.state.descValue,
      "content": this.state.code,
      "tag_ids": tags
    }]
    if (this.state.titleValue == "") {
      message.error("标题必须填写")
    } else if (this.state.descValue == "") {
      message.error("简介必须填写")
    } else if (this.state.code == "") {
      message.error("正文必须填写")
    } else if(!this.props.blog){
      this.setState({
        visible: false,
      });
      this.props.addArticle(article);
    }else{
       this.setState({
        visible: false,
      });
      article[0].id=this.props.blog.id;
      this.props.changeArticle(article);
    }
  }
  handleCancel() {
    this.setState({
      visible: false,
    });
    this.props.handleCancel();
  }
  updateCode(newCode) {
    this.setState({
      code: newCode
    });
  }
  hideTag() {
    this.setState({
      tagLibrary: false
    })
  }
  addTag(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      tagLibrary: true,
      
      tagBox: {
        top: document.getElementById("addTag").offsetTop + document.getElementById("addTag").clientHeight + 10
      }
      ,init:false
    })
    console.log(this.state.tagsList.length)
    if (this.state.tagsList.length == 0) {
      this.props.getTagList();
    }
  }
  handleClose(id) {
    this.props.deleteTags(id);
  }
  handleDeleteTag() {

  }
  addTagList() {
    this.setState({ newTag: true })
  }
  handleAddTag() {
    this.props.addTag(this.state.addInputValue);
    this.setState({ newTag: false, addInputValue: "" })
  }
  handleChangeAddTag(e) {
    this.setState({ addInputValue: e.target.value })
  }
  addArticleTad(tag) {
    let tagsTemp = this.state.tags;
    tagsTemp.push(tag)
    this.setState({ tagsTemp })
  }
  handleArticleClose(tagId) {
    let tagsTemp = this.state.tags;
    tagsTemp.filter(tag => (tag.id !== tagId) && tag);
    this.setState({
      tagsTemp
    })
  }
  handleTitleChange(e) {
    this.setState({ titleValue: e.target.value })
  }
  handleDescChange(e) {
    this.setState({ descValue: e.target.value })
  }
  handleKeywordsChange(e) {
    this.setState({ keywords: e.target.value })
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
        <div className="context" onClick={this.hideTag.bind(this)} style={{ overflow: this.state.tagLibrary ? "hidden" : "auto" }}>
          <h2 className="title">标题</h2>
          <Input placeholder="输入标题" value={this.state.titleValue} onChange={this.handleTitleChange.bind(this)} />
          <h2>简介</h2>
          <Input type="textarea" rows={3} value={this.state.descValue} onChange={this.handleDescChange.bind(this)} placeholder="输入简介" />
          <h2>关键字（seo优化）</h2>
          <Input placeholder="比如（HTML,博客,xxxx）" value={this.state.keywords} onChange={this.handleKeywordsChange.bind(this)} />

          <div>
            <h2>标签</h2>
            <div>
              {this.state.tags ? this.state.tags.map(tag =>
                <Tag key={tag.id} closable afterClose={this.handleArticleClose.bind(this, tag.id)}>
                  {tag.name}
                </Tag>
              ) : null}
              <Button size="small" id="addTag" type="dashed" onClick={this.addTag.bind(this)}>+ 添加标签</Button>
            </div>
          </div>
          <h2>正文</h2>
          <Tabs defaultActiveKey="1">
            <TabPane tab={<span><Icon type="apple" />富文本编辑器</span>} key="1">
              <MyEditor></MyEditor>
            </TabPane>
            <TabPane tab={<span><Icon type="android" />MarkDown编辑器</span>} key="2">
              <div className="mdBox">
                <div className="editor">
                  <Editor value={this.state.code} onChange={this.updateCode.bind(this)} />
                </div>
                <div className="preview" dangerouslySetInnerHTML={{ __html: preview }} />
              </div>
            </TabPane>
          </Tabs>


        </div>
        {this.state.tagLibrary ? <div className="tagBox" id="tagBox" style={this.state.tagBox}>
          <h2>标签库</h2>
          <Search placeholder="搜索你想要的标签库" onSearch={value => console.log(value)} />
          <div className="tagLibrary">
            {this.props.tagList ? this.props.tagList.map(tag =>
              <Tag key={tag.id} onClick={this.addArticleTad.bind(this, tag)} closable onClose={this.handleDeleteTag(this)} afterClose={this.handleClose.bind(this, tag.id)}>
                {tag.name}
              </Tag>
            ) : null}
            {this.state.newTag ? <div className="newTag">
              <Input addonAfter={<Icon type="check" onClick={this.handleAddTag.bind(this)} />}
                onChange={this.handleChangeAddTag.bind(this)}
                value={this.state.addInputValue}
                placeholder="新的的标签名" size="small" />
            </div> : null}
            <Button size="small" id="addTag" type="dashed" onClick={this.addTagList.bind(this)}>+ 添加标签</Button>
          </div>
        </div> : null}
      </Modal>

    )
  }

}

export default MyComponent
