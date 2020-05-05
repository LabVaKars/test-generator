import React, { useState } from 'react'
import PropTypes from 'prop-types'
import authService from 'services/auth.service'

import Button from 'components/common/Button'
import TextInput from '../components/common/TextInput';
import useRegisterFormValidation from '../hooks/useRegisterFormValidation';

const INITIAL_STATE = {
    email: "",
    password: "",
    confPassword: ""
}

export default RegisterPage

function RegisterPage(props) {
    const { values, handleChange, errors, validate, alerts, setAlerts} = useRegisterFormValidation(INITIAL_STATE);

	function LoginClick(){
        console.log("Looged in");
        if(validate()){
            let credentials = {
                email: values.email,
                password: values.password
            }
            authService.registerUser(credentials)
            .then(setAlerts({
                form: "Activation link was send to provided email"
            }))
        }
        
	}

	return (
		<>
			<div className="card">
				<div className="card-header">
					<h2>Register page</h2>
				</div>
				<div className="card-body">
					<div className="form-group">
                        <div className="row">
                            <div className="col-sm-6 ">
                                <TextInput label="Email" placeholder="Email..." name="email"
									handleChange={handleChange} value={values.email}/>
                            </div>
                            {errors.email && <div className="col-sm-6">
                                <div className="alert alert-danger small p-1">{errors.email}</div>
                            </div>}
                        </div>

                        <div className="row">
                            <div className="col-sm-6">
                                <TextInput label="Password" placeholder="Password..." name="password" type="password"
									handleChange={handleChange} value={values.password}/>
                            </div>
                            {errors.password && <div className="col-sm-6">
                                <div className="alert alert-danger small p-1">{errors.password}</div>
                            </div>}
                        </div>

                        <div className="row">
                            <div className="col-sm-6">
                                <TextInput label="Confirm password" placeholder="Confirm password..." name="confPassword" type="password"
									handleChange={handleChange} value={values.confPassword}/>
                            </div>
                            {errors.confPassword && <div className="col-sm-6">
                                <div className="alert alert-danger small p-1">{errors.confPassword}</div>
                            </div>}
                        </div>
                        <div className="row">
                            {alerts.form && <div className="col-sm-6">
                                <div className="alert alert-success small p-1">{alerts.form}</div>
                            </div>}
                        </div>
                        
					</div>
				</div>
				<div className="card-footer">
                    <div className="">
                        <div className="d-inline"><Button name={"Register"} handleClick={LoginClick} /></div>
                        {/* {Object.keys(errors).length == 0 && <div className="ml-1 d-inline alert alert-success small p-1">Registered successfully</div>} */}
                    </div>
				</div>
			</div>
		</>
	)
}

RegisterPage.propTypes = {
	loginValue: PropTypes.string,
	loginOnChange: PropTypes.func,
	passwordValue: PropTypes.string,
	passwordOnChange: PropTypes.func,
}


