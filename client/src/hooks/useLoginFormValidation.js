import { useState } from "react";
import authService from 'services/auth.service'


function validateAuth(values){
    let errors = {}
    // Email errors
    if(!values.email){
        errors.email = "Required email"
    } 
    // Password validation
    if(!values.password){
        errors.password = "Required password"
    }

    return errors
}


function useLoginFormValidation(initialState){
    const [values, setValues] = useState(initialState)
    const [errors, setErrors] = useState({})

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
            setErrors({})
            // let credentials = {
            //     email: values.email,
            //     password: values.password
            // }
            return true
        }
    }

    return {
        values,
        handleChange,
        setErrors,
        errors,
        validate,
    }
}

export default useLoginFormValidation;