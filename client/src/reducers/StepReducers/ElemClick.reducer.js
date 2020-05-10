import update from 'immutability-helper'
import { CLEAN_FORM } from 'constants/StepTypes/StepFormCommon.types'
import { CHANGE_VALUE } from 'constants/StepTypes/ElemSetValue.types'
import { CHANGE_STATE_TYPE, CHANGE_STATE_SIGN, IS_PRESENT } from '../../constants/StepTypes/AssertElemState.types'

const handlers = {
	[CLEAN_FORM]: (state) => {
		return update(state, {$set: {}})
	},
	DEFAULT: state => state,
}

const ElemClickReducer = (state, action) => {
	let handle = handlers[action.type] || handlers.DEFAULT
	return handle(state, action)
}

export default ElemClickReducer