import React, {useContext} from 'react'
import PropTypes from 'prop-types'

import {useDrag, useDrop} from 'react-dnd'
import {Link, useHistory} from 'react-router-dom'
import {ItemTypes} from 'constants/ItemTypes'


GroupRow.propTypes = {
}

export default function GroupRow(props) {

	const {
		id,
		serverId,
        name,
		description,
		isSelected,
		index,
		projectId,
		groupId,
		isRoot,
		deleteGroup,
		moveGroup,
		selectGroup,
	} = props

	let history = useHistory()
	const ref = React.useRef(null)

	const [, drop] = useDrop({
		accept: ItemTypes.GROUP_ROW,
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
			moveGroup(dragIndex, hoverIndex)
			item.index = hoverIndex
		},
	})

	const [{isDragging}, drag] = useDrag({
		item: {type: ItemTypes.GROUP_ROW, id, index},
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	})

	drag(drop(ref))

	let trStyle = {
		backgroundColor: (isSelected) ? 'green' : 'white',
		opacity: isDragging ? 0 : 1,
	}

	return (
		<>
			<tr ref={ref} style={trStyle} onClick={() => selectGroup(id)} >
				<td style={{width: '50px'}}>
					<div className="input-group">
						{index + 1}
					</div>
				</td>
				<td>{id}</td>
				<td>{name}</td>
				<td>{description}</td>
				<td>
					<div className="d-flex align-items-center justify-content-around">
						<i className="fas fa-trash-alt text-danger" onClick={(e) => {
							e.stopPropagation()
							deleteGroup(index)
						}}></i>
						{serverId && (
							// <Link to={`/project/${projectId}/group/${serverId}`}>
								<i className="fas fa-edit text-primary" onClick={() => {
									history.push(`/project/${projectId}/group/${serverId}`)
								}}></i>
							// </Link>
						)}
					</div>
				</td>
			</tr>
		</>
	)
}

