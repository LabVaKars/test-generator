import update from 'immutability-helper'
import { CLEAN_FORM } from 'constants/StepTypes/StepFormCommon.types'
import { CHANGE_X_COOR, CHANGE_Y_COOR } from '../../constants/StepTypes/AssertWindowCoor.types'

const handlers = {
	[CLEAN_FORM]: (state) => {
		return update(state, {$merge: { x: 0, y: 0 }})
    },
    [CHANGE_X_COOR]: (state, {xCoor}) => {
        return update(state, {$merge: {x: xCoor}});
    },
    [CHANGE_Y_COOR]: (state, {yCoor}) => {
        return update(state, {$merge: {y: yCoor}});
    },
	DEFAULT: state => state,
}

const AssertWindowCoorReducer = (state, action) => {
	let handle = handlers[action.type] || handlers.DEFAULT
	return handle(state, action)
}

export default AssertWindowCoorReducer