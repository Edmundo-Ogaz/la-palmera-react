import axios from 'axios';

import { setUserSession } from './sessionStorage'

export const signin = async (username, password) => {
	console.log('signin')
	try {
		const { data } = await axios
			.post(`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_ENDPOINT_AUTH_SIGNIN}`,
				{ username: username, password: password }
			)

			// const { data } = await axios({
			// 	method: 'post',
			// 	url:`${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_ENDPOINT_AUTH_SIGNIN}`,
			// 	withCredentials: false,
			// 	data: { username: username, password: password }
			//   });

		setUserSession(data.token, data.user, data.expiration);
	} catch (err) {
		console.error('signin '+err)
		throw err
	}
};