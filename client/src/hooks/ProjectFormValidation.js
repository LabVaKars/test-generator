import { SET_ERRORS } from '../constants/ProjectTypes/Project.types'



function projectFormValidation(state, reducer){

	

	function validate(){
		if(Object.keys(validateAuth(values)).length > 0){
			setErrors(validateAuth(values))
			return false
		} else {
			setErrors({})
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

export default projectFormValidation