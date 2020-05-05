import axios from 'axios'

// const instance = axios.create({
//     baseUrl: "http://localhost:3000/"
// })

const registerUser = async (credentials) => {
	await axios.post('http://localhost:3000/api/auth/register', credentials)
}

const loginUser = async (credantials) => {
	await axios.post('http://localhost:3000/api/auth/login', credentials)
}

const logoutUser = () => {
	axios.post('http://localhost:3000/api/auth/logout')
}



const authService = {
	registerUser,
	loginUser,
	logoutUser,
}

export default authService
