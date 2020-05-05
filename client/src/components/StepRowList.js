import React from 'react'
import PropTypes from 'prop-types'

import Loading from 'common/Loading'

export default function StepRowList(props) {
	const { steps, renderRow, stepsLoading} = props

	return (
		<>
			<table className="table table-bordered">
				<thead>
					<tr>
						<th style={{width: '50px'}}>#</th>
						<th>Step description</th>
						<th style={{width: '100px'}}>Actions</th>
					</tr>
				</thead>
				<tbody>
					{stepsLoading ? (
						<tr>
							<td colSpan="3" className="text-center">
								<Loading />
							</td>
						</tr>
					) :	(
						<>
							{steps.map((step, i) => renderRow(step, i))}
						</>
					)}
				</tbody>
			</table>
		</>
	)
}

StepRowList.propTypes = {
	id: PropTypes.string,
	steps: PropTypes.array,
}
