import React from 'react'
import PropTypes from 'prop-types'

/**
 * Stateless
 * return simple button template
 * @param {string} name Label used in button
 * @param {func} handleClick Action run on button click 
 */

Button.propTypes = {
	name: PropTypes.string,
	handleClick: PropTypes.func,
}

export default function Button(props){

	const {name, icon, handleClick, disabled} = props
	const buttonName = (icon == undefined) 
		? (name)
		: (
			<>
				{icon} | {name}
			</>)
	
	return (
		<button type="button" className="btn btn-sm btn-success" 
			onClick={handleClick} disabled={disabled}
		>
			{buttonName}
		</button>
	)
}


