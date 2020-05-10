import React from 'react'
import PropTypes from 'prop-types'

import Button from 'common/Button'

DropdownFormSelect.propTypes = {
	id: PropTypes.number,
}

export default function DropdownFormSelect(props) {

    let {
        options, 
        name, 
        value,
        handleChange,
        // handleSelect
    } = props

    console.log(value);
    



    let col1Style = {minWidth: "100px"}
    let col2Style = {minWidth: "200px"}

	return (
        <>
            <div className="input-group input-group-sm">
                <div className="input-group-prepend">
                    <span className="input-group-text">{name}</span>
                </div>
                <input className="form-control" type="text" value={value} disabled/>
                <div className="input-group-append">                
                    <button type="button" className="btn btn-sm btn-success dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="sr-only">Toggle Dropdown</span>
                    </button>
                    <div className="dropdown-menu">
                        {options.map((group) => {
                            return (<>
                                <h4 className="dropdown-header">{group.name}</h4>
                                {group.sub.map((opt) => {
                                    return <button className="dropdown-item" value={opt.value} onClick={handleChange}><span style={col1Style}>{opt.group}</span> | <span style={col2Style}>{opt.name}</span></button>
                                })}        
                            </>)
                        })}
                    </div>
                </div>
            </div>
        </>
	)
}

