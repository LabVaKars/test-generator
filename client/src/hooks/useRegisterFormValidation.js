import { useState } from 'react'
import authService from 'services/auth.service'


function validateAuth(values){
	let errors = {}
	// Email errors
	let emailRegexp = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)
	if(!values.email){
		errors.email = 'Required email'
	} else if(!emailRegexp.test(values.email)) {
		errors.email = 'Invalid email address'
	}
	// Password validation
	if(!values.password){
		errors.password = 'Required password'
	} else if(values.length < 8){
		errors.password = 'Password minimal length is 8 symbols'
	}
	// Confirm password validation
	if(!values.confPassword){
		errors.confPassword = 'Password confirm is required'
	} else if(values.confPassword != values.password){
		errors.confPassword = 'Passwords don\'t match'
	}

	return errors
}


function useRegisterFormValidation(initialState){
	const [values, setValues] = useState(initialState)
	const [errors, setErrors] = useState({})
	const [alerts, setAlerts] = useState({})

	function handleChange(e){
		setValues({
			...values,
			[e.target.name]: e.target.value
		})
	}

	function validate(){
		if(Object.keys(validateAuth(values)).length > 0){
			setErrors(validateAuth(values))
			return false
		} else {
			return true
		}
	}

	return {
		values,
		handleChange,
		errors,
		validate,
		alerts,
		setAlerts
	}
}

export default useRegisterFormValidation