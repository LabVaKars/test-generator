import React from 'react'
import PropTypes from 'prop-types'

import TextInput from 'common/TextInput'
import { CHANGE_NAME, CHANGE_DESCRIPTION } from 'constants/Test.types'

TestRowForm.propTypes = {
	id: PropTypes.number,
}

export default function TestRowForm(props) {

	const {selectedTest, reducer} = props

	let name, description

	if(selectedTest && selectedTest.length == 1){

		let st = selectedTest[0]

		console.log(st)
        
		return (
			<>
				<TextInput 
					label="Test name" placeholder="Enter name for your group..."
					handleChange={(e) => reducer({type: CHANGE_NAME, value: e.target.value, id: st.id})} 
					value={st.name}/>
				<TextInput 
					label="Test description" placeholder="Enter description for your group..."
					handleChange={(e) => reducer({type: CHANGE_DESCRIPTION, value: e.target.value, id: st.id})} 
					value={st.description}/>
			</>
		)
	} else {
		return <>
			<div>Empty Form</div>
		</>
	}
}

