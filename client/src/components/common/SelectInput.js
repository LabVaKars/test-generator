import React from 'react'
import Select from './Select'

export default function SelectInput(props) {
	let {
        label, options, handleChange, selectedIdx, disabled
	} = props
	return (
        <>
            <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">{label}</span>
                </div>
                <Select options={options} handleChange={handleChange} selectedIdx={selectedIdx} disabled={disabled}/>
            </div>
        </>
	)
}


