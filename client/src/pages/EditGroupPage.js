import React from 'react'
import PropTypes from 'prop-types'

import GroupTableEdit from '../components/GroupTableEdit'

EditGroupPage.propTypes = {
	id: PropTypes.number,
}

export default function EditGroupPage(props) {
	
	const {match: {path}} = props
	const [ , , projectId, , groupId, ] = path.split('/')

	return (
		<>
			<GroupTableEdit projectId={projectId} groupId={groupId} isRoot={false} />
		</>
	)
}

