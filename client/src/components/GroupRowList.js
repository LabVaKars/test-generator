import React, {useContext} from 'react'
import PropTypes from 'prop-types'

import Loading from 'common/Loading'

GroupRowList.propTypes = {
	projects: PropTypes.array,
	renderRow: PropTypes.func,
}

export default function GroupRowList(props) {

	const { groups, renderRow, groupsLoading } = props

	return (
		<>

			<table className="table table-bordered">
				<thead>
					<tr>
						<th style={{width: '50px'}}>#</th>
						{/* <th style={{width: '50px'}}>ID</th> */}
						<th>Group name</th>
						<th>Group description</th>
						<th style={{width: '100px'}}>Actions</th>
					</tr>
				</thead>
				<tbody>
					{groupsLoading ? (
						<tr>
							<td colSpan="5" className="text-center">
								<Loading />
							</td>
						</tr>
					) :	(
						<>
							{groups.map((group, i) => renderRow(group, i))}
						</>
					)}
				</tbody>
			</table>
		</>
	)
}


