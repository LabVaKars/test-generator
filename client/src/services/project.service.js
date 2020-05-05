import axios from 'axios'

// const instance = axios.create({
//     baseUrl: "http://localhost:3000/"
// })

async function getAllProjects() {
	const result = await axios.get('http://localhost:3000/api/project/projects');
	return result.data
}

async function saveAllProjects(form) {
	console.log(form);
    const result = await axios.post('http://localhost:3000/api/project/projects', form)
    return result.data;
}

const projectService = {
    getAllProjects,
    saveAllProjects,
}

export default projectService