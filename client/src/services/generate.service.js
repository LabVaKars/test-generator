import axios from 'axios'

// const instance = axios.create({
//     baseUrl: "${window.location.origin}/"
// })

const getGeneratedCode = async (projectId) => {
	let result = await axios.get(`/api/generate/project/${projectId}`)
	return result.data
}

const generateService = {
	getGeneratedCode
}

export default generateService
