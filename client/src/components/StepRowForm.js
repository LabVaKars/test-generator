import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { EMPTY_STEP, BROWSER_URL, BROWSER_ACTION, SELECT_ELEM, ELEM_CLICK, ELEM_SET_VALUE, EMPTY_ELEM_STEP } from 'constants/Step.types'
import BrowserUrlForm from 'components/StepForms/BrowserUrl.form'
import BrowserActionForm from 'components/StepForms/BrowserAction.form'
import EmptyStepForm from 'components/StepForms/EmptyStep.form'
import SelectElementForm from './StepForms/SelectElement.form'
import SelectInput from './common/SelectInput'
import NotSelectedForm from './StepForms/NotSelected.form'
import ElementClickForm from './StepForms/ElementClick.form'
import EmptyElemStepForm from './StepForms/EmptyElemStep.form'
import ElementSetValueForm from './StepForms/ElementSetValue.form'
import { ELEM_ASSERT_STATE, ELEM_ASSERT_HTML_ATTR, ELEM_ASSERT_CSS_PROP, ELEM_ASSERT_VALUE, ELEM_ASSERT_TEXT, ELEM_ASSERT_TAG_NAME, ELEM_ASSERT_COOR, ELEM_ASSERT_SIZE, COOKIE_ASSERT, COOKIE_DELETE, COOKIE_UPDATE, BROWSER_ASSERT_TITLE, BROWSER_ASSERT_URL, PROMPT_SET_VALUE, PROMPT_ACTION, PROMPT_ASSERT, WINDOW_SET_COOR, WINDOW_SET_SIZE, WINDOW_ASSERT_COOR, WINDOW_ASSERT_SIZE } from '../constants/Step.types'
import AssertElemStateForm from './StepForms/AssertElemState.form'
import AssertHTMLPropForm from './StepForms/AssertHTMLProp.form'
import AssertCSSPropForm from './StepForms/AssertCSSProp.form'
import AssertElemValueForm from './StepForms/AssertElemValue.form'
import AssertElemTextForm from './StepForms/AssertElemText.form'
import AssertElemTagNameForm from './StepForms/AssertElemTagName.form'
import AssertElemCoorForm from './StepForms/AssertElemCoor.form'
import AssertElemSizeForm from './StepForms/AssertElemSize.form'
import AssertCookieForm from './StepForms/AssertCookie.form'
import CookieDeleteForm from './StepForms/CookieDelete.form'
import CookieUpdateForm from './StepForms/CookieUpdate.form'
import AssertBrowserTitleForm from './StepForms/AssertBrowserTitle.form'
import AssertBrowserUrlForm from './StepForms/AssertBrowserUrl.form'
import AssertPromptForm from './StepForms/AssertPrompt.form'
import PromptActionForm from './StepForms/PromptAction.form'
import PromptSetValueForm from './StepForms/PromptSetValue.form'
import AssertWindowCoorForm from './StepForms/AssertWindowCoor.form'
import AssertWindowSizeForm from './StepForms/AssertWindowSize.form'
import WindowSetCoorForm from './StepForms/WindowSetCoor.form'
import WindowSetSizeForm from './StepForms/WindowSetSize.form'

let documentOptions = [
	{name: "Actions | Browser | Navigate to Url", value: BROWSER_URL},
	{name: "Actions | Browser | Navbar Action", value: BROWSER_ACTION},
	{name: "Actions | Cookie | Delete", value: COOKIE_DELETE},
	{name: "Actions | Cookie | Update", value: COOKIE_UPDATE},
	{name: "Actions | Prompt | Value", value: PROMPT_SET_VALUE},
	{name: "Actions | Prompt | Action", value: PROMPT_ACTION},
	{name: "Actions | Window | Coordinates", value: WINDOW_SET_COOR},
	{name: "Actions | Window | Size", value: WINDOW_SET_SIZE},
	{name: "Assertions | Browser | Title", value: BROWSER_ASSERT_TITLE},
	{name: "Assertions | Browser | Url", value: BROWSER_ASSERT_URL},
	{name: "Assertions | Cookie | Value", value: COOKIE_ASSERT},
	{name: "Assertions | Prompt | Value", value: PROMPT_ASSERT},
	{name: "Assertions | Window | Coordinates", value: WINDOW_ASSERT_COOR},
	{name: "Assertions | Window | Size", value: WINDOW_ASSERT_SIZE},
]

let elementOptions = [
	{name: "Actions | Element | Click", value: ELEM_CLICK},
	{name: "Actions | Element | Set Value", value: ELEM_SET_VALUE},
	{name: "Assertions | Element | Element State", value: ELEM_ASSERT_STATE},
	{name: "Assertions | Element | Element Value", value: ELEM_ASSERT_VALUE},
	{name: "Assertions | Element | Element Text", value: ELEM_ASSERT_TEXT},
	{name: "Assertions | Element | Element TagName", value: ELEM_ASSERT_TAG_NAME},
	{name: "Assertions | Element | Element Coordinates", value: ELEM_ASSERT_COOR},
	{name: "Assertions | Element | Element Size", value: ELEM_ASSERT_SIZE},
	{name: "Assertions | Element | Element HTML Attribute", value: ELEM_ASSERT_HTML_ATTR},		
	{name: "Assertions | Element | Element CSS Property", value: ELEM_ASSERT_CSS_PROP},
]

export default function StepRowForm(props) {
	const {
		reducer,
		changeStep,
		selectedStep
	} = props

	let ss, isSelected = false
	if(selectedStep && selectedStep.length == 1){
		isSelected = true
		ss = selectedStep[0]
	}
	
	let options
	let currentFormTemplate
	let selectedFormIdx
	if(isSelected){
		switch(ss.stype){
			case EMPTY_STEP:
				currentFormTemplate = (<EmptyStepForm />)
			break
			case EMPTY_ELEM_STEP:
				currentFormTemplate = (<EmptyElemStepForm />)
			break
			case SELECT_ELEM:
				currentFormTemplate = (<SelectElementForm reducer={reducer} selectedStep={selectedStep} />)
			break
			case ELEM_CLICK:
				currentFormTemplate = (<ElementClickForm />)
			break
			case ELEM_SET_VALUE:
				currentFormTemplate = (<ElementSetValueForm reducer={reducer} selectedStep={selectedStep} />)
			break
			case ELEM_ASSERT_STATE:
				currentFormTemplate = (<AssertElemStateForm reducer={reducer} selectedStep={selectedStep} />)
			break
			case ELEM_ASSERT_VALUE:
				currentFormTemplate = (<AssertElemValueForm reducer={reducer} selectedStep={selectedStep} />)
			break
			case ELEM_ASSERT_TEXT:
				currentFormTemplate = (<AssertElemTextForm reducer={reducer} selectedStep={selectedStep} />)
			break
			case ELEM_ASSERT_COOR:
				currentFormTemplate = (<AssertElemCoorForm reducer={reducer} selectedStep={selectedStep} />)
			break
			case ELEM_ASSERT_SIZE:
				currentFormTemplate = (<AssertElemSizeForm reducer={reducer} selectedStep={selectedStep} />)
			break
			case ELEM_ASSERT_TAG_NAME:
				currentFormTemplate = (<AssertElemTagNameForm reducer={reducer} selectedStep={selectedStep} />)
			break
			case ELEM_ASSERT_HTML_ATTR:
				currentFormTemplate = (<AssertHTMLPropForm reducer={reducer} selectedStep={selectedStep} />)
			break
			case ELEM_ASSERT_CSS_PROP:
				currentFormTemplate = (<AssertCSSPropForm reducer={reducer} selectedStep={selectedStep} />)
			break
			case COOKIE_ASSERT:
				currentFormTemplate = (<AssertCookieForm reducer={reducer} selectedStep={selectedStep}/>)
			break
			case COOKIE_DELETE:
				currentFormTemplate = (<CookieDeleteForm reducer={reducer} selectedStep={selectedStep}/>)
			break
			case COOKIE_UPDATE:
				currentFormTemplate = (<CookieUpdateForm reducer={reducer} selectedStep={selectedStep}/>)
			break
			case COOKIE_ASSERT:
				currentFormTemplate = (<AssertCookieForm reducer={reducer} selectedStep={selectedStep}/>)
			break
			case PROMPT_ASSERT:
				currentFormTemplate = (<AssertPromptForm reducer={reducer} selectedStep={selectedStep}/>)
			break
			case PROMPT_ACTION:
				currentFormTemplate = (<PromptActionForm reducer={reducer} selectedStep={selectedStep}/>)
			break
			case PROMPT_SET_VALUE:
				currentFormTemplate = (<PromptSetValueForm reducer={reducer} selectedStep={selectedStep}/>)
			break
			case WINDOW_ASSERT_COOR:
				currentFormTemplate = (<AssertWindowCoorForm reducer={reducer} selectedStep={selectedStep}/>)
			break
			case WINDOW_ASSERT_SIZE:
				currentFormTemplate = (<AssertWindowSizeForm reducer={reducer} selectedStep={selectedStep}/>)
			break
			case WINDOW_SET_COOR:
				currentFormTemplate = (<WindowSetCoorForm reducer={reducer} selectedStep={selectedStep}/>)
			break
			case WINDOW_SET_SIZE:
				currentFormTemplate = (<WindowSetSizeForm reducer={reducer} selectedStep={selectedStep}/>)
			break
			case BROWSER_ASSERT_TITLE:
				currentFormTemplate = (<AssertBrowserTitleForm reducer={reducer} selectedStep={selectedStep}/>)
			break
			case BROWSER_ASSERT_URL:
				currentFormTemplate = (<AssertBrowserUrlForm reducer={reducer} selectedStep={selectedStep}/>)
			break
			case BROWSER_URL:
				currentFormTemplate = (<BrowserUrlForm reducer={reducer} selectedStep={selectedStep}/>)
			break
			case BROWSER_ACTION:
				currentFormTemplate = (<BrowserActionForm reducer={reducer} selectedStep={selectedStep}/>)
			break
		}
		if (ss && ss.scope == "Document"){
			options = documentOptions
		} else if(ss && ss.scope == "Element"){
			options = elementOptions
		} 
		selectedFormIdx = options.findIndex((opt) => {
			return opt.value == ss.stype
		})
	} else {
		selectedFormIdx = -1
		currentFormTemplate = (
			<NotSelectedForm />
		)
	}

	function handleChange(e){
		changeStep(ss.id, e.target.value)
	}

	return (
		<div>
			{((ss && ss.stype != SELECT_ELEM)) && <><SelectInput options={options} handleChange={handleChange} 
				label="Current Form" selectedIdx={selectedFormIdx} disabled={!isSelected} 
			/>
			<hr /></>}
			<div className="container-fluid">
				{currentFormTemplate}
			</div>
		</div>
	)
}

StepRowForm.propTypes = {
	id: PropTypes.number,
}
