import React from 'react'
import PropTypes from 'prop-types'

import Button from 'common/Button'

GeneratorPage.propTypes = {
	id: PropTypes.number,
}

export default function GeneratorPage() {
	return (
		<>
			<div className="card-header">
                Test Generator!
			</div>
			<div className="card-body">
                Select project to generate tests code:
				<select>
					<option>Project1</option>
					<option>Project2</option>
					<option>Project3</option>
				</select>
                
			</div>
			<div className="card-footer">
				<Button handleClick={() => console.log('Clicked')} name="Generate"/>
			</div>
		</>
	)
}

