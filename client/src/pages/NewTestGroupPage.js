import React from 'react'
import PropTypes from 'prop-types'

// import TestGroupForm from 'components/TestGroupForm'

export default function NewTestGroupPage(props) {
	
	const {match: {path}} = props
	const [ , , groupId, , ] = path.split('/')

	return (
		<>
			{/* <TestGroupForm mode={"new"} groupId={groupId} /> */}
		</>
	)
}

NewTestGroupPage.propTypes = {
	id: PropTypes.number,
}
