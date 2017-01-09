import config from '../config'
import axios from 'axios'
import { resolveArguement } from './resolve'



/**
 * @param  {string} username
 * @param  {string} password
 */

// 获取博客列表
export function getBlogList() {
    let argObj = resolveArguement(arguments),
        currentN = argObj.currentN ? argObj.currentN : 1,
        pageCount = argObj.pageCount ? parseInt(argObj.pageCount) : pageCount;
    return (dispatch) => {
        axios({
                method: 'post',
                url: config.serverURL + '/mgr/v1/articles/list',
                data: {
                    "startTime": argObj.startTime ? argObj.startTime : "",
                    "endTime": argObj.endTime ? argObj.endTime : "",
                    "orderBy": "id",
                    "IsDesc": true,
                    "offsetHead": (currentN - 1) * pageCount,
                    "offsetTail": currentN * pageCount,
                    // "keywords": argObj.keywords ? argObj.keywords : "",
                    // "where": {
                    //     "status": argObj.status ? argObj.status : "",
                    //     "region": argObj.region ? [argObj.region] : [],
                    // }

                },
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": config.AuthenticationToken,

                },
            })
            .then((res) => {
                if (res.status == 200) {
                    dispatch({
                        type: 'GETBLOGLIST',
                        data: res.data.data
                    })
                }
            })
    }
}

// 获取标签列表
export function getTagList() {
    let argObj = resolveArguement(arguments),
        currentN = argObj.currentN ? argObj.currentN : 1,
        pageCount = argObj.pageCount ? parseInt(argObj.pageCount) : pageCount;
    return (dispatch) => {
        axios({
                method: 'post',
                url: config.serverURL + '/mgr/v1/tags/list',
                data: {
                    "startTime": argObj.startTime ? argObj.startTime : "",
                    "endTime": argObj.endTime ? argObj.endTime : "",
                    "orderBy": "id",
                    "IsDesc": true,
                    "offsetHead": (currentN - 1) * pageCount,
                    "offsetTail": currentN * pageCount,
                    // "keywords": argObj.keywords ? argObj.keywords : "",
                    // "where": {
                    //     "status": argObj.status ? argObj.status : "",
                    //     "region": argObj.region ? [argObj.region] : [],
                    // }

                },
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": config.AuthenticationToken,

                },
            })
            .then((res) => {
                if (res.status == 200) {
                    dispatch({
                        type: 'GETTAGLIST',
                        data: res.data.data
                    })
                }
            })
    }
}
//根据id查询正文
export function articlesView(data) {
    return new Promise((resolve, rej) => {
        axios({
                method: 'post',
                url: config.serverURL + '/mgr/v1/articles/view',
                data: data,
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": config.AuthenticationToken,
                },
            })
            .then((res) => {
                if (res.status == 200) {
                    resolve(res.data.data)
                }
            })
    })

}

//添加标签
export function addTags(data) {
    return new Promise((resolve, rej) => {
        axios({
                method: 'post',
                url: config.serverURL + '/mgr/v1/tags',
                data: data,
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": config.AuthenticationToken,
                },
            })
            .then((res) => {
                if (res.status == 200) {
                    resolve(res.data.data)
                }
            })
    })

}
// 删除标签
export function deleteTags(data) {
    return new Promise((resolve, rej) => {
        axios({
                method: 'delete',
                url: config.serverURL + '/mgr/v1/tags',
                data: data,
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": config.AuthenticationToken,
                },
            })
            .then((res) => {
                if (res.status == 200) {
                    resolve(res.data.data)
                }
            })
    })

}

//增加文章
export function addArticle(data) {
    return new Promise((resolve, rej) => {
        axios({
                method: 'post',
                url: config.serverURL + '/mgr/v1/articles',
                data: data,
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": config.AuthenticationToken,
                },
            })
            .then((res) => {
                if (res.status == 200) {
                    resolve(res.data.data)
                }
            })
    })

}
//删除文章
export function deleteArticle(data) {
    return new Promise((resolve, rej) => {
        axios({
                method: 'delete',
                url: config.serverURL + '/mgr/v1/articles',
                data: data,
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": config.AuthenticationToken,
                },
            })
            .then((res) => {
                if (res.status == 200) {
                    resolve(res.data.data)
                }
            })
    })

}
//修改文章
export function changeArticle(data) {
    return new Promise((resolve, rej) => {
        axios({
                method: 'put',
                url: config.serverURL + '/mgr/v1/articles',
                data: data,
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": config.AuthenticationToken,
                },
            })
            .then((res) => {
                if (res.status == 200) {
                    resolve(res.data.data)
                }
            })
    })

}