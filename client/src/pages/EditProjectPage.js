import React from 'react'
import PropTypes from 'prop-types'

import GroupTableEdit from 'components/GroupTableEdit'

export default function EditProjectPage(props) {

	const {match: {path}} = props
	console.log(path.split('/'));
	
	const [ , , projectId, , groupId, ] = path.split('/')

	return (
		<>
			<GroupTableEdit projectId={projectId} groupId="root" isRoot={true} />
		</>
	)
}

EditProjectPage.propTypes = {
}
