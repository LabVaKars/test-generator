import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Header from './Header'
import AboutPage from 'pages/AboutPage'
import WelcomePage from 'pages/WelcomePage'
import NotFoundPage from 'pages/NotFoundPage'
import LoginPage from 'pages/LoginPage'
import EditTestPage from 'pages/EditTestPage'
import EditGroupPage from 'pages/EditGroupPage'
import EditProjectPage from 'pages/EditProjectPage'
import MyProjectsPage from 'pages/MyProjectsPage'
import RegisterPage from 'pages/RegisterPage'

import AuthWrapper from 'components/AuthWrapper'
import GeneratorPage from '../pages/GeneratorPage'

export function App(props){

	return (
		<>
			<Header />
			<Switch>
				<Route exact path="/register" component={RegisterPage} />
				<Route exact path="/login" component={LoginPage} />
				<Route exact path="/projects" component={AuthWrapper(MyProjectsPage)} />
				<Route exact path="/generate" component={AuthWrapper(GeneratorPage)} />
				{/* <Route exact path="/about" component={AboutPage} /> */}
				<Route path="/project/:project_id" render={({match}) => (
					<>
						<Route exact path={`${match.url}/`} component={AuthWrapper(EditProjectPage)} />
						<Route path={`${match.url}/group/:group_id`} render={({match}) => (
							<>
								<Route exact path={`${match.url}/`} component={AuthWrapper(EditGroupPage)} />
								<Route path={`${match.url}/test/:test_id`} render={({match}) => (
									<>
										<Route exact path={`${match.url}/`} component={AuthWrapper(EditTestPage)} />
									</>
								)}/>
							</>
						)}/>
					</>
				)} />
				{/* <Route exact path="/" component={WelcomePage} /> */}
				<Route exact path="/" component={AboutPage} />
				<Route component={NotFoundPage} />
			</Switch>
		</>
	)
}
