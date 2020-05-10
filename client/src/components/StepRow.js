import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import {useHistory} from 'react-router-dom'

import EmptyStepRow from 'components/StepForms/EmptyStep.row'
import BrowserUrlRow from 'components/StepForms/BrowserUrl.row'
import BrowserActionRow from 'components/StepForms/BrowserAction.row'
import {useDrag, useDrop} from 'react-dnd'
import {ItemTypes} from 'constants/ItemTypes'
import { EMPTY_STEP, BROWSER_URL, BROWSER_ACTION } from 'constants/Step.types'
import { SELECT_ELEM, EMPTY_ELEM_STEP, ELEM_CLICK, ELEM_SET_VALUE, ELEM_ASSERT_STATE, ELEM_ASSERT_HTML_ATTR, ELEM_ASSERT_CSS_PROP, ELEM_ASSERT_VALUE, ELEM_ASSERT_TEXT, ELEM_ASSERT_TAG_NAME, ELEM_ASSERT_COOR, ELEM_ASSERT_SIZE, COOKIE_ASSERT, COOKIE_DELETE, COOKIE_UPDATE, BROWSER_ASSERT_TITLE, BROWSER_ASSERT_URL, PROMPT_ASSERT, PROMPT_ACTION, PROMPT_SET_VALUE } from '../constants/Step.types'
import SelectElementRow from './StepForms/SelectElement.row'
import EmptyElemStepRow from './StepForms/EmptyElemStep.row'
import ElementClickRow from './StepForms/ElementClick.row'
import ElementSetValueRow from './StepForms/ElementSetValue.row'
import AssertElemStateRow from './StepForms/AssertElemState.row'
import AssertHTMLPropRow from './StepForms/AssertHTMLProp.row'
import AssertCSSPropRow from './StepForms/AssertCSSProp.row'
import AssertElemValueRow from './StepForms/AssertElemValue.row'
import AssertElemTextRow from './StepForms/AssertElemText.row'
import AssertElemTagNameRow from './StepForms/AssertElemTagName.row'
import AssertElemCoorRow from './StepForms/AssertElemCoor.row'
import AssertElemSizeRow from './StepForms/AssertElemSize.row'
import AssertCookieRow from './StepForms/AssertCookie.row'
import CookieDeleteRow from './StepForms/CookieDelete.row'
import CookieUpdateRow from './StepForms/CookieUpdate.row'
import AssertBrowserTitleRow from './StepForms/AssertBrowserTitle.row'
import AssertBrowserUrlRow from './StepForms/AssertBrowserUrl.row'
import AssertPromptRow from './StepForms/AssertPrompt.row'
import PromptActionRow from './StepForms/PromptAction.row'
import PromptSetValueRow from './StepForms/PromptSetValue.row'

export default function StepRow(props) {
	const {
		stype,
		scope,
		name,
		isSelected,
		form,
		id,
		index,
		deleteStep,
		moveStep,
		selectStep,
		parentElem,
	} = props

	let history = useHistory()
	const ref = React.useRef(null)

	const [, drop] = useDrop({
		accept: ItemTypes.STEP_ROW,
		hover(item, monitor) {
			if (!ref.current) {
				return
			}
			const dragIndex = item.index
			const hoverIndex = index
			if (dragIndex === hoverIndex) {
				return
			}
			const hoverBoundingRect = ref.current.getBoundingClientRect()
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
			const clientOffset = monitor.getClientOffset()
			const hoverClientY = clientOffset.y - hoverBoundingRect.top
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return
			}
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return
			}
			moveStep(dragIndex, hoverIndex)
			item.index = hoverIndex
		},
	})

	const [{isDragging}, drag] = useDrag({
		item: {type: ItemTypes.STEP_ROW, id, index},
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	})

	drag(drop(ref))

	const trStyle = {
		backgroundColor: (isSelected) ? 'green' : 'white',
		opacity: isDragging ? 0 : 1,
	}

	let blockContent

	switch (stype) {
		case EMPTY_STEP:
			blockContent = <EmptyStepRow />
		break
		case EMPTY_ELEM_STEP:
			blockContent = <EmptyElemStepRow />
		break
		case SELECT_ELEM:
			blockContent = <SelectElementRow form={form}/>
		break
		case ELEM_CLICK: 
			blockContent = <ElementClickRow parentForm={parentElem.form}/>
		break
		case ELEM_SET_VALUE: 
			blockContent = <ElementSetValueRow form={form} parentForm={parentElem.form}/>
		break
		case ELEM_ASSERT_STATE: 
			blockContent = <AssertElemStateRow form={form} parentForm={parentElem.form}/>
		break
		case ELEM_ASSERT_VALUE: 
			blockContent = <AssertElemValueRow form={form} parentForm={parentElem.form}/>
		break
		case ELEM_ASSERT_TEXT: 
			blockContent = <AssertElemTextRow form={form} parentForm={parentElem.form}/>
		break
		case ELEM_ASSERT_COOR: 
			blockContent = <AssertElemCoorRow form={form} parentForm={parentElem.form}/>
		break
		case ELEM_ASSERT_SIZE: 
			blockContent = <AssertElemSizeRow form={form} parentForm={parentElem.form}/>
		break
		case ELEM_ASSERT_TAG_NAME: 
			blockContent = <AssertElemTagNameRow form={form} parentForm={parentElem.form}/>
		break
		case ELEM_ASSERT_HTML_ATTR: 
			blockContent = <AssertHTMLPropRow form={form} parentForm={parentElem.form}/>
		break
		case ELEM_ASSERT_CSS_PROP: 
			blockContent = <AssertCSSPropRow form={form} parentForm={parentElem.form}/>
		break
		case COOKIE_ASSERT: 
			blockContent = <AssertCookieRow form={form}/>
		break
		case COOKIE_DELETE: 
			blockContent = <CookieDeleteRow form={form}/>
		break
		case COOKIE_UPDATE: 
			blockContent = <CookieUpdateRow form={form}/>
		break
		case PROMPT_ASSERT: 
			blockContent = <AssertPromptRow form={form}/>
		break
		case PROMPT_ACTION: 
			blockContent = <PromptActionRow form={form}/>
		break
		case PROMPT_SET_VALUE: 
			blockContent = <PromptSetValueRow form={form}/>
		break
		case BROWSER_ASSERT_TITLE:
			blockContent = <AssertBrowserTitleRow form={form}/>
		break
		case BROWSER_ASSERT_URL:
			blockContent = <AssertBrowserUrlRow form={form}/>
		break
		case BROWSER_URL:
			blockContent = <BrowserUrlRow form={form}/>
		break
		case BROWSER_ACTION:
			blockContent = <BrowserActionRow form={form}/>
		break
		default:
			blockContent = <EmptyStepRow />
		break
	}

	return (
		<>
			<tr ref={ref} style={trStyle} onClick={() => selectStep(id)}>
				<td style={{width: '50px'}}>
					<div className="input-group">
						{index + 1}
					</div>
				</td>
				<td>
					{scope}{scope == "Element" && <>({parentElem.form.name})</>}
				</td>
				<td>
					{blockContent}
				</td>
				<td>
					<div className="d-flex align-items-center justify-content-around">
						<i className="fas fa-trash-alt text-danger" onClick={(e) => {
							e.stopPropagation()
							deleteStep(id)
						}}></i>
					</div>
				</td>
			</tr>
		</>
	)
}

StepRow.propTypes = {
	id: PropTypes.string,
}
