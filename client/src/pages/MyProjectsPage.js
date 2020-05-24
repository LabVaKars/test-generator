import React from 'react'
import PropTypes from 'prop-types'

import ProjectTableEdit from 'components/ProjectTableEdit'

MyProjectsPage.propTypes = {
	id: PropTypes.number,
}


export default function MyProjectsPage() {


	return (
		<>
			<ProjectTableEdit />
		</>
	)
}

