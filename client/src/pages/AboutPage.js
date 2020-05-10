import React from 'react'
import PropTypes from 'prop-types'

AboutPage.propTypes = {
	id: PropTypes.number,
}

export default function AboutPage(props) {
	return (
		<>
			<div className="card-header">
				<h3>About this application</h3>
			</div>
			<div className="card-body">
				<p>This is an application, that let you create e2e tests and to generate source code for this tests</p>
				<p>To start using this application, please log in, if you already have account or register, if you don't</p>
			</div>
			<div className="card-header">
				<h3>Short manual</h3>
			</div>
			<div className="card-body">
				<h5>Step 1:</h5>
				<p>Log in to application</p>
				<h5>Step 2:</h5>
				<p>Click on <span className="text-primary">My projects</span> link in Navbar</p>
				<h5>Step 3:</h5>
				<p>Create new project by clicking on <span className="text-primary">Add Project</span> button</p>
				<h5>Step 4:</h5>
				<p>Click on <span className="text-primary">Edit Group and Tests</span> button to create your first tests</p>
				<h5>Step 5:</h5>
				<p>Add new tests by clicking on <span className="text-primary">Add Test</span> or 
					<span className="text-primary">Add Test Group</span> buttons. Save your changes</p>
				<h5>Step 6:</h5>
				<p>Go to Generator Tab. Select apropriate generation way(Whole project, separate test group or single test) 
                    and click <span className="text-primary">Generate Code</span> button</p>
			</div>
		</>
	)
}

