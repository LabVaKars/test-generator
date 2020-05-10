import update from 'immutability-helper'
import { CLEAN_FORM } from 'constants/StepTypes/StepFormCommon.types'
import { CHANGE_COOKIE } from '../../constants/StepTypes/CookieDelete.types'

const handlers = {
	[CLEAN_FORM]: (state) => {
		return update(state, {$set: { cookie:'' }})
	},
	[CHANGE_COOKIE]: (state, {cookie}) => {
		return update(state, {$merge: { cookie: cookie }})
	},
	DEFAULT: state => state,
}

const CookieDeleteReducer = (state, action) => {
	let handle = handlers[action.type] || handlers.DEFAULT
	return handle(state, action)
}

export default CookieDeleteReducer