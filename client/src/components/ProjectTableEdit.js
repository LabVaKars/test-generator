import React, { useReducer, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'

import useProjectTableForm from '../hooks/useProjectTableForm'
import ProjectRowList from 'components/ProjectRowList'
import ProjectRowForm from 'components/ProjectRowForm'
import ProjectRow from 'components/ProjectRow'
import Button from 'common/Button'


ProjectTableEdit.propTypes = {
	id: PropTypes.number,
}

export default function ProjectTableEdit(props) {
    
    // const {projects} = props

    let {
        projectForm,
        projectFormR,
        getProjectData,
        addProject,
        deleteProject,
        selectProject,
        saveChanges,
        projectsLoading,
    } = useProjectTableForm()

    useEffect(() => {
        getProjectData()
    },[])

    const projectRowHandlers = {
        deleteProject,
        selectProject,
    }

    const selectedProject = projectForm.projects.filter(project => {
        return project.isSelected == true
    })

    return (
        <>
            <div className="card-header">
                <h3>My created projects</h3>
            </div>
            {projectForm.hasChanges
                ? <div className="alert alert-danger m-0">You have unsaved changes</div>
                : <div className="alert alert-success m-0">All changes saved</div>
            }
            <div className="card-header">
                <h4>Project Settings</h4>
            </div>
            <div className="card-header">
                <ProjectRowForm 
                    reducer={projectFormR}
                    selectedProject={selectedProject}
                />
            </div>
            <div className="card-body overflow-auto" style={{maxHeight: '300px', minHeight: '300px'}}>
                <ProjectRowList 
                    projectsLoading={projectsLoading}
                    projects={projectForm.projects} 
                    reducer={projectFormR}
                    renderRow={(projectRow, i) => 
                        <ProjectRow
                            key={projectRow.id}
                            index={i}
                            {...projectRow}
                            {...projectRowHandlers}
                        />
                    } />
            </div>
            <div className="card-footer">
                <Button 
                    name="Add Project" 
                    icon={<i className="fas fa-plus-square"></i>} 
                    handleClick={addProject} />
                <Button 
                    name="Save Changes" 
                    disabled={!projectForm.hasChanges}
                    // icon={<i className="fas fa-edit"></i>} 
                    handleClick={saveChanges} />
            </div>
        </>
    )

}

