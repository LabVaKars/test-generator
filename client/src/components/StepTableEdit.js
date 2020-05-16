
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import Button from 'components/common/Button'
import StepRowList from 'components/StepRowList'
import StepRow from 'components/StepRow'
import Breadcrumb from 'components/Breadcrumb'
import useGroupBreadcrumb from '../hooks/useGroupBreadcrumb'
import useStepTableForm from '../hooks/useStepTableForm'
import StepRowForm from './StepRowForm'
import DropdownFormSelect from './DropdownFormSelect'


StepTableEdit.propTypes = {
	id: PropTypes.number,
}

function StepTableEdit(props) {

	const {projectId, groupId, testId} = props 

	let {
        stepForm,
        stepFormR,
        getStepData,
		addStep,
		addElement,
        deleteStep,
        moveStep,
		selectStep,
		changeStep,
        saveStepChanges,
        stepsLoading,
	} = useStepTableForm(projectId, groupId, testId)

	useEffect(() => {
		getBreadcrumbData(),
		getStepData()
	},[])

	useEffect(() => {
		getBreadcrumbData(),
		getStepData()
	},[testId])

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
				<h2>Edit Steps Form</h2>
			</div>
			{stepForm.hasChanges
				? <div className="alert alert-danger m-0">You have unsaved changes</div>
				: <div className="alert alert-success m-0">All changes saved</div>
			}
			<div className="card-header">
				<h2>Step edit form</h2>
			</div>
			<div className="card-header">
				<StepRowForm 
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
					renderRow={(stepRow, i) => { 
						let parentElem
						if(stepRow.scope == "Element"){
							let index = stepForm.steps.findIndex(s => {	
								return stepRow.elemId == s.id
							})
							parentElem = stepForm.steps[index]
						}
						return <StepRow
								key={stepRow.id}
								index={i}
								{...stepRow}
								{...stepRowHandlers}
								parentElem={parentElem}
							/>
						}
					} />  
			</div>
			<div className="card-footer">
				<div className="d-flex flex-row justify-content-between">
					<div>
						<Button name={'Add Step'} handleClick={addStep} />
						<Button name={'Add Element'} handleClick={addElement} />
					</div>
					<div>
						<Button name={'Save Changes'} handleClick={saveStepChanges} />
					</div>
				</div>
			</div>
		</>
	)
}


export default StepTableEdit

