
import React, { useCallback, useState, useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'

import Button from 'components/common/Button'
import StepRowList from 'components/StepRowList'
import StepRow from 'components/StepRow'
import StepForm from 'components/StepForms/StepForm'
import Breadcrumb from 'components/Breadcrumb'
import StepFormReducer from 'reducers/TestReducers/StepForm.reducer'
import { ADD_STEP, DELETE_STEP, MOVE_STEP, CHANGE_STEP_BY_ID, CLONE_STEP } from 'constants/TestTypes/StepForm.types'
import { EMPTY_STEP } from 'constants/Step.types'
import testService from 'services/test.service'
import { SET_STEPS, TOGGLE_SELECT_STEP, INIT_STEPS } from '../constants/TestTypes/StepForm.types'
import useGroupBreadcrumb from '../hooks/useGroupBreadcrumb'


StepTableEdit.propTypes = {
	id: PropTypes.number,
}

function StepTableEdit(props) {

    const {projectId, groupId, testId} = props 

    const [stepsLoading, setStepsLoading] = useState(false)

    useEffect(() => {
        getBreadcrumbData(),
        getStepData()
    },[])

    useEffect(() => {
        getBreadcrumbData(),
        getStepData()
    },[testId])

    const [stepForm, stepFormR] = useReducer(StepFormReducer, {
        steps: [],
        hasChanges: false
    });

    function serverToLocalState(steps){
        let result = steps.map((p, index) => {
            let localId = shortid.generate()
            return {
                id: localId,
                projectId: p.projectId,
                stype: p.stype,
                form: p.form,
                groupId: p.groupId,
                testId: p.testId,
                isSelected: false
            }
        })
        return result
    }

    function localToServerState(steps){
        let result = steps.map((p, index) => {
            return {
                projectId: p.projectId,
                groupId: p.groupId,
                testId: p.testId,
                stype: p.stype,
                order: index + 1,
                form: p.form,
            }
        })
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
        stepFormR({type: ADD_STEP, id: id, stype: EMPTY_STEP});
    } 

    function cloneStep(){
        let id = shortid.generate()
        stepFormR({type: CLONE_STEP, id: id})
    }
    
    function deleteStep(id) {
        stepFormR({type:DELETE_STEP, id: id})
    }
    
    function moveStep(dragIndex, hoverIndex) {
        stepFormR({type:MOVE_STEP, dragIndex, hoverIndex});
    }

    function selectStep(id) {
        stepFormR({type:TOGGLE_SELECT_STEP, id: id, multiSelect: false})
    }

    function changeStep(id, stype) {
        stepFormR({type:CHANGE_STEP_BY_ID, id, stype})
    }

    function saveStepChanges(){
        updateStepData()
        console.log("Changes saved");
    }

    const {breadcrumb, getBreadcrumbData} = useGroupBreadcrumb(projectId, groupId, testId)

    const stepRowHandlers = {
        deleteStep,
        moveStep,
        selectStep,
    }

    const selectedStep = stepForm.steps.filter(step => {
        return step.isSelected == true
    })

	return (
        <>
            <Breadcrumb links={breadcrumb} />
            <div className="card-header">
                <h2>Edit steps form</h2>
            </div>
            <div className="card-header">
                <div className="d-flex flex-row justify-content-between">
                    <div>
                        <Button name={'Add Step'} handleClick={addStep} />
                        <Button name={'Clone Step'} handleClick={cloneStep} />
                    </div>
                    <div>
                        <Button name={'Save Changes'} handleClick={saveStepChanges} />
                    </div>
                </div>
            </div>
            <div className="card-header">
                <h2>Step edit form</h2>
            </div>
            <div className="card-header">
                <StepForm 
                    reducer={stepFormR}
                    changeStep={changeStep}  
                    selectedStep={selectedStep}
                />
            </div>
            <div className="card-body overflow-auto" style={{maxHeight: '400px', minHeight: '400px'}}>
                <StepRowList
                    stepsLoading={stepsLoading}
                    steps={stepForm.steps} 
                    reducer={stepFormR}
                    renderRow={(stepRow, i) => 
                        <StepRow
                            key={stepRow.id}
                            index={i}
                            {...stepRow}
                            {...stepRowHandlers}
                        />
                    } />  
            </div>
        </>
	)
}


export default StepTableEdit

