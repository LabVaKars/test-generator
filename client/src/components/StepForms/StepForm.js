import React from 'react'
import PropTypes from 'prop-types'
import { EMPTY_STEP, BROWSER_URL, BROWSER_ACTION } from 'constants/Step.types';
import BrowserUrlForm from 'components/StepForms/BrowserUrl.form';
import BrowserActionForm from 'components/StepForms/BrowserAction.form';
import EmptyStepForm from 'components/StepForms/EmptyStep.form';

export default function StepForm(props) {
	const {
		reducer,
		changeStep,
		selectedStep
	} = props;

	let ss, isSelected = false;
	if(selectedStep && selectedStep.length == 1){
		isSelected = true
		ss = selectedStep[0]
	}


	const options = [
		{label: 'Empty', value: EMPTY_STEP},
		{label: 'Browser URL select', value: BROWSER_URL},
		{label: 'Browser action', value: BROWSER_ACTION},
	]

	let currentForm;
    if(isSelected){
		switch(ss.stype){
			case EMPTY_STEP:
				currentForm = (
					<EmptyStepForm />
				)
			break;
			case BROWSER_URL:
				currentForm = (
					<BrowserUrlForm reducer={reducer} selectedStep={selectedStep}/>
				)
			break;
			case BROWSER_ACTION:
				currentForm = (
					<BrowserActionForm reducer={reducer} selectedStep={selectedStep}/>
				)
			break;
		} 
	} else {
		currentForm = (
			<EmptyStepForm />
		)
	}

	return (
		<div>
			<select className="form-input" onChange={(e) => changeStep(ss.id, e.target.value)} disabled={!isSelected}>
				{options.map((o, i) => {
					return (<option key={i} value={o.value}>{o.label}</option>)
				})}
			</select>
			<hr/>
			<div className="container-fluid">
				{currentForm}
			</div>
		</div>
	)
}

StepForm.propTypes = {
	id: PropTypes.number,
}
