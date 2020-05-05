import update from 'immutability-helper'
import shortid from 'shortid'
import emptyFormReducer from 'reducers/StepReducers/EmptyForm.reducer'
import browserFormReducer from 'reducers/StepReducers/BrowserUrlForm.reducer'

import { SELECT_STEP, DESELECT_STEP } from '../../constants/TestTypes/SelectedStep.types'

const reducers = {
    BROWSER_URL: browserFormReducer,
    DEFAULT: emptyFormReducer
}

const handlers = {
    [SELECT_STEP]: (state, {steps, id}) => {
        const newSelectedStep = steps.filter((step) => {
            return step.id == id
        });
        return update(state, {$set: {
            isSelected: true,
            step: newSelectedStep[0]
        }})
    },
    [DESELECT_STEP]: (state) => {
        return update(state, {$set: {
            isSelected: false,
            step: {}
        }})
    },
    DEFAULT: state => state,
}

const  selectedStepReducer = (state, action) => {
    let handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
}

export default selectedStepReducer