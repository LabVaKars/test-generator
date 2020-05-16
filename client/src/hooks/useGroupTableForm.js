import {useReducer, useState} from 'react'
import shortid from 'shortid'

import GroupFormReducer from '../reducers/GroupReducers/GroupForm.reducer'
import groupService from 'services/group.service'
import { INIT_GROUPS, ADD_GROUP, DELETE_GROUP, TOGGLE_SELECT_GROUP, MOVE_GROUP, SAVE_CHANGES, SET_ERRORS } from '../constants/GroupTypes/Group.types'

function useGroupTableForm(projectId, groupId, isRoot){

	let initialState = {
		groups: [],
		hasChanges: false
	}

	const [groupsLoading, setGroupsLoading] = useState(false)

	const [groupForm, groupFormR] = useReducer(GroupFormReducer, initialState)

	function validateForm(groups){
		let noErrors = true
		for(let group of groups){
			let errors = {};
			if(group.name.length == 0) {
				noErrors = false
				errors.name = 'This field is required'
			}
			groupFormR({type:SET_ERRORS, id: group.id, errors: errors})
		}
		return noErrors
	}

	function serverToLocalState(groups){
		console.log(groups);
		
		let result = groups.map((p) => {
			let localId = shortid.generate()
			return {
				id: localId,
				serverId: p._id,
				projectId: p.projectId,
				groupId: p.groupId,
				errors: {},
				name: p.name,
				description: p.description,
				isSelected: false
			}
		})
		return result
	}

	function localToServerState(groups){
		let result = groups.map((p,i) => {
			return {
				_id: p.serverId,
				projectId: projectId,
				groupId: (isRoot ? 'root' : groupId),
				orderIdx: i,
				name: p.name,
				description: p.description
			}
		})
		return result
	}

	async function getGroupData(){
		let groups
		if(isRoot){
			setGroupsLoading(true)
			groups = await groupService.getProjectGroups(projectId)
			setGroupsLoading(false)
		} else {
			setGroupsLoading(true)
			groups = await groupService.getSubGroups(projectId, groupId)
			setGroupsLoading(false)
		}
		groups = serverToLocalState(groups)
		groupFormR({type:INIT_GROUPS, groups: groups})
	} 

	async function updateGroupData(){
		let groups
		if(isRoot){
			setGroupsLoading(true)
			groups = await groupService.saveProjectGroups(projectId, localToServerState(groupForm.groups))
			setGroupsLoading(false)
		} else {
			setGroupsLoading(true)
			groups = await groupService.saveSubGroups(projectId, groupId, localToServerState(groupForm.groups))
			setGroupsLoading(false)
		}
		groups = serverToLocalState(groups)
		groupFormR({type:INIT_GROUPS, groups: groups})
		groupFormR({type: SAVE_CHANGES})
	}

	function addGroup(){
		let id = shortid.generate()
		groupFormR({type:ADD_GROUP, id: id})
	}

	function deleteGroup(id){
		groupFormR({type:DELETE_GROUP, id: id})
	}

	function moveGroup(dragIndex, hoverIndex){
		groupFormR({type:MOVE_GROUP, dragIndex, hoverIndex})
	}

	function selectGroup(id){
		groupFormR({type:TOGGLE_SELECT_GROUP, id: id, multiSelect: false})
	}

	function saveGroupChanges(){
		if(validateForm(groupForm.groups)){
			updateGroupData()
			console.log('Changes saved')
		}
        
	}

	return {
		groupForm,
		groupFormR,
		getGroupData,
		updateGroupData,
		addGroup,
		deleteGroup,
		moveGroup,
		selectGroup,
		saveGroupChanges,
		groupsLoading,
	}

}

export default useGroupTableForm