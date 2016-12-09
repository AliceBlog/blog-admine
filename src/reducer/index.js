import { combineReducers } from 'redux-immutablejs'
import { routerStateReducer } from 'redux-router'
import user from './user'
import blog from './blog'



export const reducer = combineReducers({
    route: routerStateReducer,
    user,
    blog
})