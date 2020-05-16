import React from 'react'
import PropTypes from 'prop-types'

import TextInput from 'common/TextInput'
import { CHANGE_NAME, CHANGE_BASE_URL } from '../constants/ProjectTypes/Project.types'

ProjectRowForm.propTypes = {
	id: PropTypes.number,
}

export default function ProjectRowForm(props) {

	const {selectedProject, reducer} = props

	if(selectedProject && selectedProject.length == 1){

		let sp = selectedProject[0]

		console.log(sp);
		

		return (
			<>
				<div className="row">
					<div className="col-6">
						<TextInput 
							label="Project name" placeholder="Enter name for your project..."
							handleChange={(e) => reducer({type: CHANGE_NAME, value: e.target.value, id: sp.id})} 
							value={sp.name}/>
					</div>
					{ sp.errors.name &&
						<div className="col-6">
							<div className="alert alert-danger small p-1">{sp.errors.name}</div>
						</div>
					}
				</div>
				{/* <TextInput 
					label="Project base URL" placeholder="Enter base URL for your project..."
					handleChange={(e) => reducer({type: CHANGE_BASE_URL, value: e.target.value, id: sp.id})} 
					value={sp.baseUrl}/> */}
			</>
		)
	} else {
		return <>
			<div>Empty Form</div>
		</>
	}
}

