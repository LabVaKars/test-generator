import React, {useContext} from 'react'
import PropTypes from 'prop-types'

import {useDrag, useDrop} from 'react-dnd'
import {Link, useHistory} from 'react-router-dom'


ProjectRow.propTypes = {
}

export default function ProjectRow(props) {

	let history = useHistory()
	
	const {
		id,
		serverId,
		name,
		baseUrl,
		isSelected,
		errors,
		index,
		deleteProject,
		selectProject,
	} = props	

	let bgColor = '#ffffff'
	if(Object.keys(errors).length > 0) bgColor = '#f8d7da'
	if(isSelected) bgColor = '#d4edda'

	let trStyle = {
		backgroundColor: bgColor
	}

	return (
		<>
			<tr /*ref={ref}*/ style={trStyle} onClick={() => selectProject(id)} >
				<td style={{width: '50px'}}>
					<div className="input-group">
						{index + 1}
					</div>
				</td>
				{/* <td>{id}</td> */}
				<td>{name}</td>
				{/* <td>{baseUrl}</td> */}
				<td>
					<div className="d-flex align-items-center justify-content-around">
						<i className="fas fa-trash-alt text-danger" onClick={(e) => {
							e.stopPropagation()
							deleteProject(id)
						}}></i>
						{serverId && (
							<i className="fas fa-edit text-primary" onClick={() => {
								history.push(`/project/${serverId}`)
							}}/>
						)}
					</div>
				</td>
			</tr>
		</>
	)
}

