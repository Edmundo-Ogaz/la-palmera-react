import axios from 'axios';

export const signin = (username, password) => {
	return axios
		.post('http://localhost:8081/api/services/controller/user/login', 
			{ username: username, password: password }
	)
};