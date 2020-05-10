import React from 'react'
import PropTypes from 'prop-types'
import { CHANGE_VALUE } from '../../constants/StepTypes/ElemSetValue.types'
import TextInput from '../common/TextInput'
import { CURRENT_FORM_REDUCER } from '../../constants/TestTypes/StepForm.types'
import { CHANGE_TEXT } from '../../constants/StepTypes/PromptSetValue.types'

PromptSetValueForm.propTypes = {
}

export default function PromptSetValueForm(props) {

    const {reducer, selectedStep} = props
    
	let ss = selectedStep[0]

	let text = ss.form.text

	function handleChange(e){
		reducer({type:CURRENT_FORM_REDUCER, action: CHANGE_TEXT, params: {text: e.target.value}})
	}

	return (
        <TextInput name="" label="Text" placeholder="Text to write into element"
			handleChange={handleChange} value={text} 
		/>
	)
}

