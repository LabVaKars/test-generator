import React from 'react'

export default function TextInput(props) {
	let {
		label, placeholder,
		handleChange, value,
		type, name
	} = props
	if(!type) type = 'text'
	if(!type) name = ''
	return (
		<div className="input-group input-group-sm mb-3">
			<div className="input-group-prepend">
				<span className="input-group-text" id="basic-addon1">{label}</span>
			</div>
			<input className="form-control" placeholder={placeholder} aria-label="Username" aria-describedby="basic-addon1"
				type={type} name={name} onChange={handleChange} value={value}/>
		</div>
	)
}


