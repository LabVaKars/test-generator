import update from 'immutability-helper'
import { CLEAN_FORM } from '../../constants/StepTypes/StepFormCommon.types'

const handlers = {
    [CLEAN_FORM]: (state) => {
        return update(state, {$merge: {}})
    },
    DEFAULT: state => state,
}

const emptyFormReducer = (state, action) => {
    let handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action);
}

export default emptyFormReducer