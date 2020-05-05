import React, {useContext} from 'react'
import PropTypes from 'prop-types'

import TestBlock from 'components/TestBlock'

TestBlockList.propTypes = {
	id: PropTypes.string,
	steps: PropTypes.array,
}

export default function TestBlockList(props) {
	const {
		// payload,
		// selectedStep,
		tests,
		// moveRow,
		// deleteRow,
		// selectRow,
	} = props

	return (
		<>

			<table className="table table-bordered">
				<thead>
					<tr>
						<th style={{width: '50px'}}>#</th>
						<th style={{width: '50px'}}>ID</th>
						<th style={{width: '50px'}}>Server ID</th>
						<th>Test name</th>
						<th>Test description</th>
						<th style={{width: '100px'}}>Actions</th>
					</tr>
				</thead>
				<tbody>
					{tests.map((test, i) => {
						return (
							<TestBlock
								key={test.id}
								index={i}
								{...test}
								// payload={payload}
							/>
						)
					})}
				</tbody>
			</table>
		</>
	)
}


