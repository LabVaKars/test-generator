import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import {useHistory} from 'react-router-dom'

import EmptyStepRow from 'components/StepForms/EmptyStep.row'
import BrowserUrlRow from 'components/StepForms/BrowserUrl.row'
import BrowserActionRow from 'components/StepForms/BrowserAction.row'
import {useDrag, useDrop} from 'react-dnd'
import {ItemTypes} from 'constants/ItemTypes'
import { EMPTY_STEP, BROWSER_URL, BROWSER_ACTION } from 'constants/Step.types'

export default function StepRow(props) {
	const {
		stype,
		isSelected,
		form,
		id,
		index,
		deleteStep,
        moveStep,
        selectStep,
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

	let blockContent;

	switch (stype) {
		case EMPTY_STEP:
			blockContent = <EmptyStepRow />
		break;
		case BROWSER_URL:
			blockContent = <BrowserUrlRow form={form}/>
		break;
		case BROWSER_ACTION:
			blockContent = <BrowserActionRow form={form}/>
		break;
		default:
			blockContent = <EmptyStepRow />
		break;
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
