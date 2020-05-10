import update from 'immutability-helper'
import { CLEAN_FORM } from 'constants/StepTypes/StepFormCommon.types'
import { CHANGE_VALUE, CHANGE_COOKIE } from '../../constants/StepTypes/CookieUpdate.types'

const handlers = {
	[CLEAN_FORM]: (state) => {
		return update(state, {$merge: { cookie:'', value:'' }})
	},
	[CHANGE_COOKIE]: (state, {cookie}) => {
		return update(state, {$merge: { cookie: cookie }})
	},
	[CHANGE_VALUE]: (state, {value}) => {
		return update(state, {$merge: { value: value }})
	},
	DEFAULT: state => state,
}

const CookieUpdateReducer = (state, action) => {
	let handle = handlers[action.type] || handlers.DEFAULT
	return handle(state, action)
}

export default CookieUpdateReducer