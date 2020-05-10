import React from 'react'
import {Link} from 'react-router-dom'

export default function NotFoundPage() {
	return (
		<React.Fragment>
			<h1>404 Not found</h1>
			<a className="btn btn-success"><Link to="/">Welcome</Link></a>
		</React.Fragment>
	)
}

