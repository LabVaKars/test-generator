import update from 'immutability-helper'
import { CLEAN_FORM } from 'constants/StepTypes/StepFormCommon.types'
import { CHANGE_OPTION } from '../../constants/StepTypes/PromptAction.types'

const handlers = {
	[CLEAN_FORM]: (state) => {
		return update(state, {$merge: {answer: 0}})
	},
	[CHANGE_OPTION]:(state, {answer}) => {
		return update(state, {$merge: {answer: answer}})
	},
	DEFAULT: state => state,
}

const PromptActionReducer = (state, action) => {
	let handle = handlers[action.type] || handlers.DEFAULT
	return handle(state, action)
}

export default PromptActionReducer