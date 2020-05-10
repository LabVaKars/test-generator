import React from 'react'
import PropTypes from 'prop-types'

import ProjectTableEdit from 'components/ProjectTableEdit'

MyProjectsPage.propTypes = {
	id: PropTypes.number,
}

// const projects = [
//     {id: 1, name: "Project1", baseUrl: "http://"},
//     {id: 2, name: "Project1", baseUrl: "http://"},
//     {id: 3, name: "Project1", baseUrl: "http://"},
// ]

export default function MyProjectsPage() {


	return (
		<>
			<ProjectTableEdit />
		</>
	)
}

