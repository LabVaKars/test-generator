import React from 'react'
import PropTypes from 'prop-types'

import StepTableEdit from 'components/StepTableEdit'

export default function EditTestPage(props) {
	
	const {match: {path}} = props
	const [ , , projectId, , groupId, , testId ] = path.split('/')

	return (
		<>
			{/* <h1>Edit test Page</h1> */}
			<StepTableEdit projectId={projectId} groupId={groupId} testId={testId} />
		</>
	)
}

EditTestPage.propTypes = {
}
