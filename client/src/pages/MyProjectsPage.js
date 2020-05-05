import $ from 'jquery'
import React, {useRef, useState} from 'react'
import PropTypes from 'prop-types'
import Link, {useHistory} from 'react-router-dom'

import ProjectTableEdit from 'components/ProjectTableEdit'

MyProjectsPage.propTypes = {
	id: PropTypes.number,
}

// const projects = [
//     {id: 1, name: "Project1", baseUrl: "http://"},
//     {id: 2, name: "Project1", baseUrl: "http://"},
//     {id: 3, name: "Project1", baseUrl: "http://"},
// ]

export default function MyProjectsPage(props) {

    // const { projectId } = props

    const history = useHistory()

    const newProjectLink = `/new`
    // const editProjectLink = `/edit/${projectId}`

	return (
        <>
            <ProjectTableEdit />
        </>
	)
}

