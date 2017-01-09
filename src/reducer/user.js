import { Map, List } from 'immutable'
import { LOGIN, LOGOUT, FETCH_USER, USERLIST } from '../actions/user'

const initialState = Map({
    /*
    	-1 ~ 未进行验证
    	0 ~ 正在进行验证
    	1 ~ 登录成功
    	6 ~ 登录失败
    	5 ~ 利用前一次登录保留的信息登录
     */
    loginState: localStorage.getItem('token') ? -1 : 5,
    token: localStorage.getItem('token'),
    id: localStorage.getItem('id'),
})
export default (state = initialState, action) => {
    //console.log(action.type)
    switch (action.type) {
        // 登入
        case LOGIN[0]:
            return state.set('loginState', 0)
        case LOGIN[1]:
            return handleLoginResponse(state, action)
        case LOGIN[2]:
            // For debug
            // return handleLoginResponse(state, LOGIN_RESPONSE[0])
            return handleLoginResponse(state, action)

            // 登出
        case LOGOUT:
            localStorage.removeItem('token')
            localStorage.removeItem('id')
            return Map({
                loginState: -1,
                token: null,
                id: null,
            })
        case USERLIST:
            return state.set('userList', action.data.list).set('usersCount', action.data.count)
                // 获取我的个人信息
        case FETCH_USER[1]:
            // //console.log(action.response.data.data[0]);
            return state.set('loginState', 1).merge(new Map(action.response.data.data[0]))
        default:
            return state
    }
}

function handleLoginResponse(state, action) {
    const data = action.response.data
    if (action.response.status === 200) {
        if (data.code) {
            return state.set('loginState', 6).set('massage', data.message)
        } else {
            localStorage.setItem('token', data.token)
            localStorage.setItem('id', data.id)
            return state.set('loginState', 1).merge(new Map(data))
        }
        // Login success

    } else {
        // Network error
        return state.set('loginState', 6).set('massage', data.message)
    }
}