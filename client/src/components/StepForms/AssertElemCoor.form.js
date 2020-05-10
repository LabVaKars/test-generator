import React from 'react'
import PropTypes from 'prop-types'
import { CHANGE_VALUE } from '../../constants/StepTypes/ElemSetValue.types'
import TextInput from '../common/TextInput'
import { CURRENT_FORM_REDUCER } from '../../constants/TestTypes/StepForm.types'
import Select from '../common/Select'
import { CHANGE_PROPERTY, CHANGE_SIGN, CHANGE_TEXT, CHANGE_COMPARATOR } from '../../constants/StepTypes/AssertElemValue.types'
import { signOptions, comparatorOptions} from 'constants/Selects'
import { CHANGE_X_COOR, CHANGE_Y_COOR } from '../../constants/StepTypes/AssertElemCoor.types'

AssertElemCoorForm.propTypes = {
}

export default function AssertElemCoorForm(props) {

    const {reducer, selectedStep} = props
    
	let ss = selectedStep[0]

    let xCoor = ss.form.x
    let yCoor = ss.form.y

    function handleChangeXCoor(e){
		reducer({type:CURRENT_FORM_REDUCER, action: CHANGE_X_COOR, params: {xCoor: e.target.value}})
	}

    function handleChangeYCoor(e){
		reducer({type:CURRENT_FORM_REDUCER, action: CHANGE_Y_COOR, params: {yCoor: e.target.value}})
	}

	return (
        <>
            <TextInput label="X:" type="number" 
                handleChange={handleChangeXCoor} value={xCoor}
            />
            <TextInput label="Y:" type="number" 
                handleChange={handleChangeYCoor} value={yCoor}
            />
        </>
	)
}

