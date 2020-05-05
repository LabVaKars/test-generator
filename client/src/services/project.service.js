import axios from 'axios'

// const instance = axios.create({
//     baseUrl: "${window.location.origin}/"
// })

async function getAllProjects() {
	const result = await axios.get(`${window.location.origin}/api/project/projects`);
	return result.data
}

async function saveAllProjects(form) {
	console.log(form);
    const result = await axios.post(`${window.location.origin}/api/project/projects`, form)
    return result.data;
}

const projectService = {
    getAllProjects,
    saveAllProjects,
}

export default projectService