import axios from 'axios'

// const instance = axios.create({
//     baseUrl: "http://localhost:3000/"
// })

async function getProjectTests(projectId){
	const result = await axios.get(`http://localhost:3000/api/test/${projectId}`);
	console.log(result);
	
	return result.data
}

async function getSubTests(projectId, groupId){
	const result = await axios.get(`http://localhost:3000/api/test/${projectId}/${groupId}`);
	console.log(result);
	
	return result.data
}


async function saveProjectTests(projectId, form){
	console.log(form);
    const result = await axios.post(`http://localhost:3000/api/test/${projectId}`, form)
    return result.data;
}

async function saveSubTests(projectId, groupId, form){
	console.log(form);
    const result = await axios.post(`http://localhost:3000/api/test/${projectId}/${groupId}`, form)
    return result.data;
}

async function getSteps(projectId, groupId, testId){
	const result = await axios.get(`http://localhost:3000/api/test/${projectId}/${groupId}/${testId}`);
	console.log(result);
	return result.data
}

async function saveSteps(projectId, groupId, testId, form){
	console.log(form);
    const result = await axios.post(`http://localhost:3000/api/test/${projectId}/${groupId}/${testId}`, form)
    return result.data;
}


const testService = {
	getProjectTests,
	getSubTests,
	getSteps,
	saveProjectTests,
	saveSubTests,
	saveSteps,
}

export default testService