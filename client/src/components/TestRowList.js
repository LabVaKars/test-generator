import React from 'react'
import PropTypes from 'prop-types'

import Loading from 'common/Loading'

TestRowList.propTypes = {
	projects: PropTypes.array,
	renderRow: PropTypes.func,
}

export default function TestRowList(props) {

	const { tests, renderRow, testsLoading } = props

	return (
		<>
			<table className="table table-bordered">
				<thead>
					<tr>
						<th style={{width: '50px'}}>#</th>
						<th style={{width: '50px'}}>ID</th>
						<th>Test name</th>
						<th>Test description</th>
						<th style={{width: '100px'}}>Actions</th>
					</tr>
				</thead>
				<tbody>
					{testsLoading ? (
						<tr>
							<td colSpan="5" className="text-center">
								<Loading />
							</td>
						</tr>
					) :	(
						<>
							{tests.map((test, i) => renderRow(test, i))}
						</>
					)}
				</tbody>
			</table>
		</>
	)
}


