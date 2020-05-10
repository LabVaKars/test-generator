import React, {useState} from 'react'
import AuthContext from './AuthContext'

export function AuthContextProvider(props){
	const {children} = props

	const [auth, setAuth] = useState({
		isAuthenticated: false,
		user: null
	})

	return <AuthContext.Provider value={{auth, setAuth}}>
		{children}
	</AuthContext.Provider>
}
