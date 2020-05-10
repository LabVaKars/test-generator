import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import {useHistory} from 'react-router-dom'

import Button from 'components/common/Button'
import useLoginFormValidation from '../hooks/useLoginFormValidation'
import TextInput from '../components/common/TextInput'
import AuthContext from '../hooks/AuthContext'


export default function LoginPage() {

	let history = useHistory()
	const {auth, setAuth} = useContext(AuthContext)
	console.log(auth)
	

	const INITIAL_STATE = {
		email: '',
		password: ''
	}

	const {values, handleChange, errors, setErrors, validate} = useLoginFormValidation(INITIAL_STATE)

	async function handleClick(){
		if(validate()){
			axios.post('/api/auth/login', {email: values.email, password: values.password})
				.then(() => {
					setAuth({
						isAuthenticated: true,
						user: values.email
					})
					history.push('/projects')
				})
				.catch(e => {
					console.log(e)
					setErrors({
						form: 'Username or password is incorrect'
					})
				
				})

		}
	}


	return (
		<>
			<div className="card">
				<div className="card-header">
					<h2>Login page</h2>
				</div>
				<div className="card-body">
					<div className="form-group">
						<div className="row">
							<div className="col-sm-6">
								<TextInput label="Email" placeholder="Email..." name="email"
									handleChange={handleChange} value={values.email}/>
							</div>
							{errors.email && <div className="col-sm-6">
								<div className="alert alert-danger small p-1">{errors.email}</div>
							</div>}
						</div>

						<div className="row">
							<div className="col-sm-6">
								<TextInput label="Password" placeholder="Password..." type="password" name="password"
									handleChange={handleChange} value={values.password}/>
							</div>
							{errors.password && <div className="col-sm-6">
								<div className="alert alert-danger small p-1">{errors.password}</div>
							</div>}
						</div>
						{errors.form && <div className="col-sm-6">
							<div className="alert alert-danger small p-1">{errors.form}</div>
						</div>}
					</div>
				</div>
				<div className="card-footer">
					<Button name={'Login'} handleClick={handleClick} />
				</div>
			</div>
			<div className="container-fluid">
				
			</div>
		</>
	)
}

LoginPage.propTypes = {
	loginValue: PropTypes.string,
	loginOnChange: PropTypes.func,
	passwordValue: PropTypes.string,
	passwordOnChange: PropTypes.func,
}


