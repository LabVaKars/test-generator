import React from 'react'
import PropTypes from 'prop-types'

import {Link} from 'react-router-dom'

Breadcrumb.propTypes = {
	id: PropTypes.number,
}

export default function Breadcrumb(props) {

	const {links} = props   

	return (
		<nav aria-label="breadcrumb">
			<ol className="breadcrumb">
				{links.slice(0, links.length-1).map((l) => {
					return(  
						<li className="breadcrumb-item">
							<Link to={l.link}>
								{l.name}
							</Link>
						</li>
					)
				})}
				{links.slice(links.length-1, links.length).map((l) => {
					return(  
						<li className="breadcrumb-item item-active">
							{l.name}
						</li>
					)
				})}
			</ol>
		</nav>
	)
}

