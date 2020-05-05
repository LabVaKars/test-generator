import axios from 'axios'

// const instance = axios.create({
//     baseUrl: "http://localhost:3000/"
// })

async function getProjectGroups(projectId){
	const result = await axios.get(`http://localhost:3000/api/group/${projectId}`);
	console.log(result);
	
	return result.data
}

async function getSubGroups(projectId, groupId){
	const result = await axios.get(`http://localhost:3000/api/group/${projectId}/${groupId}`);
	console.log(result);
	
	return result.data
}

async function saveProjectGroups(projectId, form){
	console.log(form);
    const result = await axios.post(`http://localhost:3000/api/group/${projectId}/root`, form)
    return result.data;
}

async function saveSubGroups(projectId, groupId, form){
	console.log(form);
    const result = await axios.post(`http://localhost:3000/api/group/${projectId}/${groupId}`, form)
    return result.data;
}

async function getGroupBreadcrumb(projectId, groupId, testId){
	let result
	if(testId != null){
		result = await axios.get(`http://localhost:3000/api/group/breadcrumb/${projectId}/${groupId}/${testId}`)	
	} else {
		result = await axios.get(`http://localhost:3000/api/group/breadcrumb/${projectId}/${groupId}`)
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
