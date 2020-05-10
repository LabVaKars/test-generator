import React from 'react'
import PropTypes from 'prop-types'

import { comparatorOptions } from 'constants/Selects'

AssertWindowCoorRow.propTypes = {
	id: PropTypes.number,
}


export default function AssertWindowCoorRow(props) {

	const {form} = props


    console.log(form);
    

	return (
		<div>
            Assert that browser window coordinates are&nbsp;  
            X:<span className="text-danger"> {form.x}</span>&nbsp;
            Y:<span className="text-danger"> {form.y}</span>&nbsp;
		</div>
	)
}

