import React from 'react'
import PropTypes from 'prop-types'

import ProjectForm from 'components/ProjectForm'

export default function NewTestPage(props) {

	const {match: {path}} = props
	const [ , , projectId, groupId, testId, ] = path.split('/')

	return (
		<>
			<ProjectForm mode={"new"} />
		</>
	)
}

NewTestPage.propTypes = {
}
