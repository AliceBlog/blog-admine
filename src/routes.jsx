import {AppContainer} from './containers/AppContainer'
import Login from "./containers/Login";
import Blog from "./containers/Blog";
import React from 'react'
import {Route, IndexRoute} from 'react-router'
import {ReduxRouter} from 'redux-router'
const routes = <ReduxRouter>
	<Route path="/">
	<IndexRoute component={AppContainer(Blog)}></IndexRoute>
	<Route path="blog" component={AppContainer(Blog)}></Route>
    <Route path="login" component={Login}></Route>

	</Route>
</ReduxRouter>

export default routes
