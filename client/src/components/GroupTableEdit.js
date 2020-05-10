import React, { useReducer, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import groupService from 'services/group.service'

import TestRowList from 'components/TestRowList'
import TestRowForm from 'components/TestRowForm'
import TestRow from 'components/TestRow'
import GroupRowList from 'components/GroupRowList'
import GroupRowForm from 'components/GroupRowForm'
import GroupRow from 'components/GroupRow'
import Button from 'common/Button'
import useTestTableForm from '../hooks/useTestTableForm'
import useGroupTableForm from '../hooks/useGroupTableForm'
import useGroupBreadcrumb from '../hooks/useGroupBreadcrumb'
import Breadcrumb from 'components/Breadcrumb'


GroupTableEdit.propTypes = {
	id: PropTypes.number,
}

export default function GroupTableEdit(props) {

	const {projectId, groupId, isRoot} = props

	let {
		testForm,
		testFormR,
		getTestData,
		addTest,
		deleteTest,
		moveTest,
		selectTest,
		saveTestChanges,
		testsLoading,
	} = useTestTableForm(projectId, groupId, isRoot)

	let {
		groupForm,
		groupFormR,
		getGroupData,
		addGroup,
		deleteGroup,
		moveGroup,
		selectGroup,
		saveGroupChanges,
		groupsLoading,
	} = useGroupTableForm(projectId, groupId, isRoot)

	let {breadcrumb, getBreadcrumbData} = useGroupBreadcrumb(projectId, groupId)


	useEffect(() => {
		getBreadcrumbData()
		getGroupData()
		getTestData()
	},[])
    
	useEffect(() => {
		getBreadcrumbData()
		getGroupData()
		getTestData()
	}, [groupId])

	const testRowHandlers = {
		deleteTest,
		moveTest,
		selectTest,
		projectId,
		groupId,
	}

	const groupRowHandlers = {
		deleteGroup,
		moveGroup,
		selectGroup,
		projectId,
		groupId,
		isRoot,
	}

	const selectedTest = testForm.tests.filter(test => {
		return test.isSelected == true
	})

	const selectedGroup = groupForm.groups.filter(group => {
		return group.isSelected == true
	})

	const groupFormTemplate = (
		<>
			<div className="card-header">
				<h3>My created groups</h3>
			</div>
			{groupForm.hasChanges
				? <div className="alert alert-danger m-0">You have unsaved changes</div>
				: <div className="alert alert-success m-0">All changes saved</div>
			}
			<div className="card-header">
				<h4>Group Settings</h4>
			</div>
			<div className="card-header">
				<GroupRowForm 
					reducer={groupFormR}
					selectedGroup={selectedGroup}
				/>
			</div>
			<div className="card-body overflow-auto" style={{maxHeight: '300px', minHeight: '300px'}}>
				<GroupRowList 
					groupsLoading={groupsLoading}
					groups={groupForm.groups} 
					reducer={groupFormR}
					renderRow={(groupRow, i) => 
						<GroupRow
							key={groupRow.id}
							index={i}
							{...groupRow}
							{...groupRowHandlers}
						/>
					} />
			</div>
			<div className="card-footer">
				<Button 
					name="Add Group" 
					icon={<i className="fas fa-plus-square"></i>} 
					handleClick={addGroup} />
				<Button 
					name="Save Changes" 
					disabled={!groupForm.hasChanges}
					// icon={<i className="fas fa-edit"></i>} 
					handleClick={saveGroupChanges} />
			</div>
		</>)

	const testFormTemplate = (
		<>
			<div className="card-header">
				<h3>My created tests</h3>
			</div>
			{testForm.hasChanges
				? <div className="alert alert-danger m-0">You have unsaved changes</div>
				: <div className="alert alert-success m-0">All changes saved</div>
			}
			<div className="card-header">
				<h4>Test Settings</h4>
			</div>
			<div className="card-header">
				<TestRowForm 
					reducer={testFormR}
					selectedTest={selectedTest}
				/>
			</div>
			<div className="card-body overflow-auto" style={{maxHeight: '300px', minHeight: '300px'}}>
				<TestRowList 
					testsLoading={testsLoading}
					tests={testForm.tests} 
					reducer={testFormR}
					renderRow={(testRow, i) => 
						<TestRow
							key={testRow.id}
							index={i}
							{...testRow}
							{...testRowHandlers}
						/>
					} />
			</div>
			<div className="card-footer">
				<Button 
					name="Add Test" 
					icon={<i className="fas fa-plus-square"></i>} 
					handleClick={addTest} />
				<Button 
					name="Save Changes" 
					disabled={!testForm.hasChanges}
					// icon={<i className="fas fa-edit"></i>} 
					handleClick={saveTestChanges} />
			</div>
		</>)

	return (
		<>
			<Breadcrumb links={breadcrumb}/>
			<div className="row">    
				{!isRoot && (
					<div className="col">
						{testFormTemplate}
					</div>)}
				<div className="col">
					{groupFormTemplate}
				</div>
			</div>
		</>
	)

}

