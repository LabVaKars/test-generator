import React from 'react'
import PropTypes from 'prop-types'
import Loading from './common/Loading'

// import ProjectRow from 'components/ProjectRow'

ProjectList.propTypes = {
	projects: PropTypes.array,
	renderRow: PropTypes.func,
}

export default function ProjectList(props) {
    
	const { projects, renderRow, projectsLoading } = props

    return (
        <>
            <table className="table table-bordered">
				<thead>
					<tr>
						<th style={{width: '50px'}}>#</th>
                        <th>ID</th>
						<th>Project name</th>
                        <th>Project URL</th>
						<th style={{width: '100px'}}>Actions</th>
					</tr>
				</thead>
				<tbody>
					{projectsLoading ? (
						<tr>
							<td colSpan="5" className="text-center">
								<Loading />
							</td>
						</tr>
					) :	(
						<>
							{projects.map((project, i) => renderRow(project, i))}
						</>
					)}
				</tbody>
			</table>
        </>
	)
}

