import React from 'react'
import {Spin} from 'antd';
import styles from "./Loading.less";
class Loading extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
		return (
            <div className={styles.root} style={this.props.loadStatus?{display:'block'}:{display:'none'}}>
                <Spin tip="Loading"/>
            </div>
		)
    }
}

export default Loading
