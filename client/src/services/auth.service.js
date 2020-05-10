import axios from 'axios'

// const instance = axios.create({
//     baseUrl: "${window.location.origin}/"
// })

const registerUser = async (credentials) => {
	await axios.post(`${window.location.origin}/api/auth/register`, credentials)
}

const loginUser = async (credentials) => {
	await axios.post(`${window.location.origin}/api/auth/login`, credentials)
}

const logoutUser = () => {
	axios.post(`${window.location.origin}/api/auth/logout`)
}



const authService = {
	registerUser,
	loginUser,
	logoutUser,
}

export default authService
