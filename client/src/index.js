// styling
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.css'
// react
import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {DndProvider} from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

import axios from 'axios'

import {App} from 'components/App'
import UnauthorizedPage from './pages/UnauthorizedPage'
import { AuthContextProvider } from './hooks/AuthContextProvider'

// axios.interceptors.response.use((res) => {
// 	return res
// },(err) => {
// 	if(401 == err.response.status){
// 		return <UnauthorizedPage />
// 	} else return Promise.reject(err)
// })

// const store = createStore(rootReducer, compose(
// 	applyMiddleware(thunk),
// 	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
// ))

// const unsubscribe = store.subscribe(() => console.log(store.getState()))

ReactDOM.render(
	// <Provider store = {store}>
	<AuthContextProvider>
		<DndProvider backend={Backend}>
			<Router>
				<Route component={App} />
			</Router>
		</DndProvider>
	</AuthContextProvider>
	// </Provider>
	, document.getElementById('root'),
)
