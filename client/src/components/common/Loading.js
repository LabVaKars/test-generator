import React from 'react'
import PropTypes from 'prop-types'

Loading.propTypes = {
	// id: PropTypes.number,
}

export default function Loading(props) {

	return (
		<div className="spinner-border" role="status">
			<span className="sr-only">Loading...</span>
		</div>
	)
}

