import axios from 'axios'

// const instance = axios.create({
//     baseUrl: "${window.location.origin}/"
// })

async function getProjectGroups(projectId){
	const result = await axios.get(`${window.location.origin}/api/group/${projectId}`);
	console.log(result);

	return result.data
}

async function getSubGroups(projectId, groupId){
	const result = await axios.get(`${window.location.origin}/api/group/${projectId}/${groupId}`);
	console.log(result);

	return result.data
}

async function saveProjectGroups(projectId, form){
	console.log(form);
    const result = await axios.post(`${window.location.origin}/api/group/${projectId}/root`, form)
    return result.data;
}

async function saveSubGroups(projectId, groupId, form){
	console.log(form);
    const result = await axios.post(`${window.location.origin}/api/group/${projectId}/${groupId}`, form)
    return result.data;
}

async function getGroupBreadcrumb(projectId, groupId, testId){
	let result
	if(testId != null){
		result = await axios.get(`${window.location.origin}/api/group/breadcrumb/${projectId}/${groupId}/${testId}`)
	} else {
		result = await axios.get(`${window.location.origin}/api/group/breadcrumb/${projectId}/${groupId}`)
	}
	console.log(result);
    return result.data;
}

const groupService = {
	getProjectGroups,
	getSubGroups,
	saveProjectGroups,
	saveSubGroups,
	getGroupBreadcrumb,
}

export default groupService
