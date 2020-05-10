import update from 'immutability-helper'
import { CLEAN_FORM } from 'constants/StepTypes/StepFormCommon.types'
import { EQUALS } from '../../constants/StepTypes/StepFormCommon.types'
import { CHANGE_SIGN, CHANGE_COMPARATOR, CHANGE_TEXT } from '../../constants/StepTypes/AssertBrowserTitle.types'

const handlers = {
	[CLEAN_FORM]: (state) => {
		return update(state, {$set: { sign: false, comparator: EQUALS, text:'' }})
    },
    [CHANGE_SIGN]: (state, {sign}) => {
        return update(state, {$merge: {sign: (sign == 'true') ? true : false}});
    },
    [CHANGE_COMPARATOR]: (state, {comparator}) => {
        return update(state, {$merge: {comparator: comparator}});
    },
    [CHANGE_TEXT]: (state, {text}) => {
        return update(state, {$merge: {text: text}})
    },
	DEFAULT: state => state,
}

const AssertBrowserTitleReducer = (state, action) => {
	let handle = handlers[action.type] || handlers.DEFAULT
	return handle(state, action)
}

export default AssertBrowserTitleReducer