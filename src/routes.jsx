import {AppContainer} from './containers/AppContainer'
import Login from "./containers/Login";
import AliceBlog from "./containers/AliceBlog";

import JermineBlog from "./containers/JermineBlog";
import React from 'react'
import {Route, IndexRoute} from 'react-router'
import {ReduxRouter} from 'redux-router'
const routes = <ReduxRouter>
	<Route path="/">
	<IndexRoute component={AppContainer(AliceBlog)}></IndexRoute>

<Route path="jermineBlog" component={AppContainer(JermineBlog)}></Route>
	<Route path="aliceBlog" component={AppContainer(AliceBlog)}></Route>
    <Route path="login" component={Login}></Route>

	</Route>
</ReduxRouter>

export default routes
