import update from 'immutability-helper'
import { CHANGE_URL } from '../../constants/StepTypes/BrowserUrlForm.types'
import { CLEAN_FORM } from '../../constants/StepTypes/StepFormCommon.types'

const handlers = {
    [CLEAN_FORM]: (state) => {
        return update(state, {$merge: { link:'' }})
    },
    [CHANGE_URL]: (state, {url}) => {
        return update(state, {$merge: { link: url }})
    },
    DEFAULT: state => state,
}

const browserUrlFormReducer = (state, action) => {
    let handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action);
}

export default browserUrlFormReducer