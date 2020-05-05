import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

export default function NotFoundPage(props) {
	return (
		<React.Fragment>
			<h1>404 Not found</h1>
			<a className="btn btn-success"><Link to="/">Welcome</Link></a>
		</React.Fragment>
	)
}

NotFoundPage.propTypes = {}
