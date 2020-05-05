import update from 'immutability-helper'
import shortid from 'shortid'
import emptyFormReducer from '../StepReducers/EmptyForm.reducer'

import { ADD_STEP, DELETE_STEP, MOVE_STEP, CURRENT_FORM_REDUCER, TOGGLE_SELECT_STEP, CHANGE_STEP_BY_INDEX, CHANGE_STEP_BY_ID, CLONE_STEP, INIT_STEPS } from 'constants/TestTypes/StepForm.types'
import { EMPTY_STEP, BROWSER_URL, BROWSER_ACTION } from 'constants/Step.types'
import browserUrlFormReducer from 'reducers/StepReducers/BrowserUrlForm.reducer'
import { CLEAN_FORM } from 'constants/StepTypes/StepFormCommon.types'
import browserActionFormReducer from 'reducers/StepReducers/BrowserActionForm.reducer'

const reducers = {
    [EMPTY_STEP]: emptyFormReducer,
    [BROWSER_URL]: browserUrlFormReducer,
    [BROWSER_ACTION]: browserActionFormReducer,
    DEFAULT: emptyFormReducer
}

const handlers = {
    [INIT_STEPS]: (state, {steps}) => {
        state = update(state, {steps: {$set: steps}})
        return state
    },
    [ADD_STEP]: (state, {id, stype}) => {
        let reducer = reducers[stype] || reducers.DEFAULT
        let form = reducer({}, {type: CLEAN_FORM})
        return update(state, {steps: {$push: [{
            id, 
            stype, 
            form,
            isSelected: false
        }]}})
    },
    [CLONE_STEP]: (state, {id}) => {
        let index = state.steps.findIndex((s) => {
            return s.isSelected == true
        })
        if(index != -1){
            let clone = update(state.steps[index], {$merge: {id: id}})
            state = update(state, {steps: {$splice: [
                [index + 1, 0, clone]
            ]}})
            console.log(state)
            return state
        } else {
            return state;
        }
    },
    [DELETE_STEP]: (state, {id}) => {
        let index = state.steps.findIndex((step) => {
            return step.id == id;
        })
		return update(state, {steps: {$splice: [
            [index, 1]
        ]}});
    },
    [TOGGLE_SELECT_STEP]: (state, {id, multiSelect}) => {
        let index = state.steps.findIndex((step) => {
            return step.id == id;
        })
        let newValue = !state.steps[index].isSelected
        let steps
        if(!multiSelect){
            steps = state.steps.map((p) => {
                return {...p, isSelected: false}
            })
            
            steps[index].isSelected = newValue;
        } else {
            steps = state.steps.slice(0)
            steps[index].isSelected = newValue;
        }
        return update(state, {steps: {$set: steps}})
    },
    [MOVE_STEP]: (state, {dragIndex, hoverIndex}) => {
        const dragRow = state.steps[dragIndex]
		return update(state, {steps: {$splice: [
			[dragIndex, 1],
			[hoverIndex, 0, dragRow],
		]}})
    },
    [CHANGE_STEP_BY_ID]: (state, {id, stype}) => {
        let index = state.steps.findIndex((step) => {
            return step.id == id
        })
        const reducer = reducers[stype] || reducers.DEFAULT;
        return update(state, { steps: { [index]: {$merge: { 
            stype: stype,
            form: reducer(state.steps[index].form, {type:CLEAN_FORM}) 
        }}}});
    },
    [CURRENT_FORM_REDUCER]: (state, {action, params}) => {
        let index = state.steps.findIndex((s) => {
            return s.isSelected == true
        })
        console.log(state);
        
        if(index != -1){
            let {stype} = state.steps[index]
            const reducer = reducers[stype] || reducers.DEFAULT;
            return update(state, {steps: {[index]: {$merge: {
                form: reducer(state.steps[index].form, {type:action, ...params})
            }}}});
        } else {
            return state;
        }
    },
    DEFAULT: state => state,
}

const StepFormReducer = (state, action) => {
    let handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
}

export default StepFormReducer