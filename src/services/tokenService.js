import axios from 'axios';

import { removeSession } from './sessionStorage'

export const verifyToken = async (token) => {

	// const URL_BASE = 'http://localhost:4000'
	const URL_BASE = 'http://localhost:8081'

	try {
		const response = await axios.get(`${URL_BASE}/verifyToken?token=${token}`)
		return response.data
	} catch (err) {
		removeSession();
		throw err
	}
};