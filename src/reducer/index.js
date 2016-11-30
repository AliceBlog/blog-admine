import {combineReducers} from 'redux-immutablejs'
import {routerStateReducer} from 'redux-router'
import user from './user'



export const reducer = combineReducers({
	route: routerStateReducer,
	user
})
