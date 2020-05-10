import React from 'react'
import PropTypes from 'prop-types'

import { comparatorOptions } from 'constants/Selects'

AssertCSSPropRow.propTypes = {
	id: PropTypes.number,
}


export default function AssertCSSPropRow(props) {

	const {form, parentForm} = props

    console.log(form);
    

    let comparator = comparatorOptions.filter((o) => {
        return o.value == form.comparator   
    })[0].name
    let sign = (form.sign) ? 'is' : 'is NOT'

	return (
		<div>
            Assert that CSS property "<span className="text-danger">{form.property}</span>" of element with css value 
            "<span className="text-danger">{parentForm.cssSelector}</span>"&nbsp;
            <span className="text-danger">{sign} {comparator}</span>&nbsp;
            "<span className="text-danger">{text}</span>"
		</div>
	)
}

