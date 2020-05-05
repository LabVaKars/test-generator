import React, {useContext} from 'react'
import PropTypes from 'prop-types'

import {useDrag, useDrop} from 'react-dnd'
import {Link} from 'react-router-dom'
import {ItemTypes} from '../constants/ItemTypes'


TestBlock.propTypes = {
}

export default function TestBlock(props) {
	const {
		// payload,
		id,
		server_id,
		name,
		description,
		// stype,
		// form,
		// id,
		index,
	} = props

	// const {
	// 	selectedStep,
	// 	moveRow,
	// 	deleteRow,
	// 	selectRow
	// } = payload;

	// const ref = React.useRef(null)

	// const [, drop] = useDrop({
	// 	accept: ItemTypes.STEP_ROW,
	// 	hover(item, monitor) {
	// 		if (!ref.current) {
	// 			return
	// 		}
	// 		const dragIndex = item.index
	// 		const hoverIndex = index
	// 		if (dragIndex === hoverIndex) {
	// 			return
	// 		}
	// 		const hoverBoundingRect = ref.current.getBoundingClientRect()
	// 		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
	// 		const clientOffset = monitor.getClientOffset()
	// 		const hoverClientY = clientOffset.y - hoverBoundingRect.top
	// 		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
	// 			return
	// 		}
	// 		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
	// 			return
	// 		}
	// 		moveRow(dragIndex, hoverIndex)
	// 		item.index = hoverIndex
	// 	},
	// })

	// const [{isDragging}, drag] = useDrag({
	// 	item: {type: ItemTypes.STEP_ROW, id, index},
	// 	collect: (monitor) => ({
	// 		isDragging: !!monitor.isDragging(),
	// 	}),
	// })

	// drag(drop(ref))

	// const trStyle = {
	// 	backgroundColor: (selectedStep.id == id) ? 'green' : 'white',
	// 	opacity: isDragging ? 0 : 1,
	// }

	// let blockContent;

	// switch (stype) {
	// 	case EMPTY_STEP:
	// 		blockContent = <EmptyStepRow />
	// 	break;
	// 	case BROWSER_URL:
	// 		blockContent = <BrowserUrlRow form={form}/>
	// 	break;
	// 	case BROWSER_ACTION:
	// 		blockContent = <BrowserActionRow form={form}/>
	// 	break;
	// 	default:
	// 		blockContent = <EmptyStepRow />
	// 	break;
	// }

	return (
		<>
			<tr /*ref={ref} style={trStyle} onClick={() => selectRow(id)} */>
				<td style={{width: '50px'}}>
					<div className="input-group">
						{index + 1}
					</div>
				</td>
				<td>{id}</td>
				<td>{server_id}</td>
				<td>{name}</td>
				<td>{description}</td>
				<td>
					<div className="d-flex align-items-center justify-content-around">
						<i className="fas fa-trash-alt text-danger" onClick={(e) => {
							// e.stopPropagation()
							// deleteRow(index)
						}}></i>
						<Link to={`/edit/root/${server_id}`}><i className="fas fa-edit text-primary"></i></Link>
					</div>
				</td>
			</tr>
		</>
	)
}

