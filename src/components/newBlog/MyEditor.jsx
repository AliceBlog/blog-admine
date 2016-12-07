import React from 'react'
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
require('react-draft-wysiwyg/dist/react-draft-wysiwyg.css');
import styles  from "./MyEditor"
class MyComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state={
           editorContents: [],
        }
    }
onEditorChange(index, editorContent){
let editorContents = this.state.editorContents;
    editorContents[index] = editorContent;
    editorContents = [...editorContents];
    this.setState({
      editorContents,
    });
}
uploadImageCallBack(file){
return new Promise(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
      xhr.open('POST', 'https://api.imgur.com/3/image');
      xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
      const data = new FormData(); // eslint-disable-line no-undef
      data.append('image', file);
      xhr.send(data);
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    }
  );
}
    render() {
      const { editorContents } = this.state;
     return (

 <Editor
  toolbarClassName="home-toolbar"
  wrapperClassName="home-wrapper"
  editorClassName="home-editor"
  onChange={this.onEditorChange.bind(this, 0)}
  uploadCallback={this.uploadImageCallBack.bind(this)}
/>

         

		)
    }

}

export default MyComponent
