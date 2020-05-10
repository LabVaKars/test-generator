import React from 'react'
import PropTypes from 'prop-types'

import TextInput from 'common/TextInput'
import { CHANGE_NAME, CHANGE_DESCRIPTION } from '../constants/GroupTypes/Group.types'

GroupRowForm.propTypes = {
	id: PropTypes.number,
}

export default function GroupRowForm(props) {

	const {selectedGroup, reducer} = props

	let name, description

	if(selectedGroup && selectedGroup.length == 1){

		let sg = selectedGroup[0]

		return (
			<>
				<TextInput 
					label="Group name" placeholder="Enter name for your group..."
					handleChange={(e) => reducer({type: CHANGE_NAME, value: e.target.value, id: sg.id})} 
					value={sg.name}/>
				<TextInput 
					label="Group description" placeholder="Enter description for your group..."
					handleChange={(e) => reducer({type: CHANGE_DESCRIPTION, value: e.target.value, id: sg.id})} 
					value={sg.description}/>
			</>
		)
	} else {
		return <>
			<div>Empty Form</div>
		</>
	}
}

