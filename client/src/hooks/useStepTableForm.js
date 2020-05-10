import { useReducer, useState } from "react"
import shortid from 'shortid'

import testService from 'services/test.service'
import StepFormReducer from 'reducers/TestReducers/StepForm.reducer'
import { ADD_STEP, DELETE_STEP, MOVE_STEP, CHANGE_STEP_BY_ID, CLONE_STEP } from 'constants/TestTypes/StepForm.types'
import { EMPTY_STEP } from 'constants/Step.types'
import { SET_STEPS, TOGGLE_SELECT_STEP, INIT_STEPS } from 'constants/TestTypes/StepForm.types'
import { SELECT_ELEM } from "../constants/Step.types"
import { isFlowPredicate } from "@babel/types"

function useStepTableForm(projectId, groupId, testId){

    const initialState = {
        steps: [],
        hasChanges: false
    }

    const [stepForm, stepFormR] = useReducer(StepFormReducer, initialState)

    const [stepsLoading, setStepsLoading] = useState(false)

    function serverToLocalState(steps){
        // let toLocal
        let result = steps.map((p) => {
            console.log(p);
            
            // let localId = shortid.generate()
            return {
                id: p.id,
                elemId: (p.scope == "Element") ? p.elemId : null,
                stype: p.stype,
                scope: p.scope,
                form: p.form,
            }
            // if(p.scope == "Element") toLocal.elemId = p.elemId
            // return toLocal
        })
        console.log(result);
        
        return result
    }

    function localToServerState(steps){
        // let toServer
        let result = steps.map((p, i) => {
            console.log(p);
            
            return {
                id: p.id,
                elemId: (p.scope == "Element") ? p.elemId : null, 
                stype: p.stype,
                scope: p.scope,
                orderIdx: i,
                form: p.form,
            }
            // if(p.scope == "Element") toServer.elemId = p.elemId
            // return toServer
        })
        console.log(result);
        
        return result
    }

    async function getStepData(){
		let steps
		setStepsLoading(true)
		steps = await testService.getSteps(projectId, groupId, testId)
		setStepsLoading(false)
		steps = serverToLocalState(steps)
		stepFormR({type:INIT_STEPS, steps: steps})
	} 

	async function updateStepData(){
		let steps
		setStepsLoading(true)
		steps = await testService.saveSteps(projectId, groupId, testId, localToServerState(stepForm.steps))
		setStepsLoading(false)
		steps = serverToLocalState(steps)
		stepFormR({type:INIT_STEPS, steps: steps})
		stepFormR({type: SAVE_CHANGES})
	}

	function addStep(){
		let id = shortid.generate()
		stepFormR({type: ADD_STEP, id: id, stype: EMPTY_STEP})
    } 

    function addElement(){
		let id = shortid.generate()
		stepFormR({type: ADD_STEP, id: id, stype: SELECT_ELEM})
    }
    
	function deleteStep(id) {
		stepFormR({type:DELETE_STEP, id: id})
	}
    
	function moveStep(dragIndex, hoverIndex) {
		stepFormR({type:MOVE_STEP, dragIndex, hoverIndex})
	}

	function selectStep(id) {
		stepFormR({type:TOGGLE_SELECT_STEP, id: id, multiSelect: false})
	}

	function changeStep(id, stype) {
		stepFormR({type:CHANGE_STEP_BY_ID, id, stype})
	}

	function saveStepChanges(){
		updateStepData()
		console.log('Changes saved')
    }
    
    return {
        stepForm,
        stepFormR,
        getStepData,
        updateStepData,
        addStep,
        addElement,
        deleteStep,
        moveStep,
        selectStep,
        changeStep,
        saveStepChanges,
        stepsLoading,
    }

}

export default useStepTableForm