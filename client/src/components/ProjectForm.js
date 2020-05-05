import React, { useState } from 'react'
import PropTypes from 'prop-types'

import TextInput from 'common/TextInput'

ProfectForm.propTypes = {
	id: PropTypes.number,
}

export default function ProfectForm(props) {
    
	const { mode, projectId } = props
	const formName = (mode == 'new') ? 'New Project form' : 'Edit Project form'

	const [name, setName] = useState('')
	const [baseUrl, setBaseUrl] = useState('')

	function changeName(e) {
		setName(e.target.value)
	}

    function changeBaseUrl(e){
		setBaseUrl(e.target.value)
    }
    
    return (
		<>
			<div className="card-header">
				<h3>{formName}</h3>
			</div>
			<div className="card-header">
				<TextInput 
					label={"Project name"} placeholder={"Enter name for your project"} 
					handleChange={changeName} value={name}/>
				<TextInput 
					label={"Project base URL:"} placeholder={"http://exmaple/com"} 
					handleChange={changeBaseUrl} value={baseUrl}/>
			</div>
		</>
	)
}

