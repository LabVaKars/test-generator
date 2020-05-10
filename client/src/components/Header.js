import React, { useContext } from 'react'
import axios from 'axios'

import {Link} from 'react-router-dom'
import AuthContext from '../hooks/AuthContext'
import authService from 'services/auth.service'

const leftLinks = [
	{path: '/', label: 'Home'},
	{path: '/projects', label: 'My Projects'},
	{path: '/generate', label: 'Generator'},
]



export default function Header(props) {

	let {auth, setAuth} = useContext(AuthContext)

	function signOut(){
		authService.logoutUser()
			.then(setAuth({
				isAuthenticated: false,
				user: null
			}))
	}
	
	if(auth && auth.isAuthenticated){
		return (
			<nav className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-between">
				<ul className="navbar-nav">
					{leftLinks.map((link) => {
						return (
							<li className="nav-item">
								<Link to={link.path}><span className="nav-link">{link.label}</span></Link>
							</li>
						)
					})}
				</ul>
				<ul className="navbar-nav">
					<li className="nav-item">
						<span className="nav-link" onClick={signOut}>Sign Out</span>
					</li>
				</ul>
			</nav>
		)
	} else {
		return (
			<nav className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-between">
				<ul className="navbar-nav">
					{leftLinks.map((link) => {
						return (
							<li className="nav-item">
								<Link to={link.path}><span className="nav-link">{link.label}</span></Link>
							</li>
						)
					})}
				</ul>
				<ul className="navbar-nav">
					<li className="nav-item">
						<Link to={'/login'}><span className="nav-link">Sign In</span></Link>
					</li>
					<li className="navbar-text">or</li>
					<li>
						<Link to={'/register'}><span className="nav-link">Sign Up</span></Link>
					</li>
				</ul>
			</nav>
		)
	}
}

