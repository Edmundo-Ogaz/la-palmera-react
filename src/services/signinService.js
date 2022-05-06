import axios from 'axios';

import { setUserSession } from './sessionStorage'

export const signin = async (username, password) => {
	try {
		const { data } = await axios
			.post('http://localhost:8081/api/services/controller/user/login',
				{ username: username, password: password }
			)
		setUserSession(data.token, data.user, data.expiration);
	} catch (err) {
		throw err
	}
};