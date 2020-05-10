import React from 'react'
import PropTypes from 'prop-types'

import Button from 'common/Button'
import SelectInput from 'common/SelectInput'

SelectButton.propTypes = {
	name: PropTypes.string,
	handleClick: PropTypes.func,
}

export default function SelectButton(props){

    const {
        name, 
        icon, 
        handleClick, 
        disabled,
        options, 
        handleChange} = props
	
	return (
        <div className="input-group input-group-sm mb-3">
        <div className="input-group-prepend">
            {/* <button className="btn btn-outline-secondary" type="button">Button</button> */}
            <Button name={name} icon={icon} disabled={disabled} handleClick={handleClick}/>
        </div>
        <SelectInput options={options} handleChange={handleChange}/>
        </div>
	)
}


