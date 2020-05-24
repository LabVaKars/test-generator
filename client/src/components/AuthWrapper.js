import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import {Link, Redirect} from 'react-router-dom'
import UnauthorizedPage from '../pages/UnauthorizedPage'
import AuthContext from '../hooks/AuthContext'

export default function AuthWrapper(WrappedComponent){
	// const auth = useContext(AuthContext)
	// console.log(auth);


	return (props) => {
		// console.log(props)

		let {auth, setAuth} = useContext(AuthContext)

		useEffect(() => {
			axios.get('/api/auth/check/session')
				.then((res) => {
					console.log(res)

					if(res.status == 200) setAuth({
						isAuthenticated: true
					})
				})
				.catch((error) => {
					console.log(error.response)

					if(error.response.status == 401) setAuth({
						isAuthenticated: false
					})
				})
		},[])

		if(auth != null && auth.isAuthenticated){
			console.log("NOT loading. Loaded");
			return <WrappedComponent {...props}/>
		} else if(auth != null && !auth.isAuthenticated){
			return <UnauthorizedPage />
		} else {
			return <h2>Loading...</h2>
		}
	}
}