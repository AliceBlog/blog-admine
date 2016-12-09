import config from '../config'
import axios from 'axios'

export const LOGIN = ['LOGIN_REQUEST', 'LOGIN_SUCCESS', 'LOGIN_FAILURE']
export const LOGOUT = 'LOGOUT'
export const FETCH_USER = ['FETCH_USER_REQUEST', 'FETCH_USER_SUCCESS', 'FETCH_USER_FAILURE']
export const USERLIST = "USERLIST"


/**
 * @param  {string} username
 * @param  {string} password
 */

// 用户登录
export function login(username, password) {
    return {
        types: LOGIN,
        callAPI: () => axios({
            method: 'post',
            url: config.api.user.login,
            data: {
                username,
                password,
            },
            headers: {
                "Content-Type": "application/json",
                "Authentication-Token": config.AuthenticationToken,
            },
        })
    }
}

// 用户登出
export function logout() {
    return (dispatch) => {
        dispatch({
            type: LOGOUT,
        })
    }
}

/**
 * @param  {String} token 用户的token
 * @param  {String} uuid  待查询用户的uuid
 */
export function restoreFromToken(token, id) {
    return {
        types: FETCH_USER,
        callAPI: () => axios({
            method: 'post',
            url: config.api.user.get,
            data: [id],
            headers: {
                "Content-Type": "application/json",
                "Authentication-Token": config.AuthenticationToken,
            },
        })
    }
}
export function getUser(pageCount, startTime, endTime, currentN, status, searchValue) {
    return (dispatch) => {
        axios({
                method: 'post',
                url: config.api.user.getUser,
                data: {
                    "startTime": startTime,
                    "endTime": endTime,
                    "orderBy": "id",
                    "keywords": searchValue,
                    "IsDesc": false,
                    "offsetHead": (currentN - 1) * pageCount,
                    "offsetTail": currentN * pageCount,
                    "where": status ? {
                        "status": "USER_STATUS_CLOSED"
                    } : {
                        "status": "USER_STATUS_ACTIVATED"
                    }
                },
                headers: {
                    "Content-Type": "application/json",
                    "X-Tuso-Authentication-Token": localStorage.getItem('token'),
                    "X-Tuso-Device-Token": config.deviceToken,
                },
            })
            .then((res) => {
                if (res.status == 200) {

                    if (res.data.errors) {
                        console.log(res.data.errors);
                    } else {
                        dispatch({
                            type: 'USERLIST',
                            data: res.data.data
                        })
                    }

                }
            })
    }
}
export function removeBlack(id) {
    return new Promise((resolve, rej) => {
        axios({
                method: 'put',
                url: config.serverURL + 'hera/v1/account/activated',
                data: [id],
                headers: {
                    "Content-Type": "application/json",
                    "X-Tuso-Authentication-Token": localStorage.getItem('token'),
                    "X-Tuso-Device-Token": config.deviceToken,
                },
            })
            .then((res) => {
                if (res.status == 200) {
                    if (res.data.data.success) {
                        resolve(res.data.data.success)
                    } else {
                        resolve(res.data)
                    }

                }
            })
    })
}
export function goBlack(id) {
    return new Promise((resolve, rej) => {
        axios({
                method: 'put',
                url: config.serverURL + 'hera/v1/account/closed',
                data: [id],
                headers: {
                    "Content-Type": "application/json",
                    "X-Tuso-Authentication-Token": localStorage.getItem('token'),
                    "X-Tuso-Device-Token": config.deviceToken,
                },
            })
            .then((res) => {
                if (res.status == 200) {
                    if (res.data.data.success) {
                        resolve(res.data.data.success)
                    } else {
                        resolve(res.data)
                    }

                }
            })
    })
}