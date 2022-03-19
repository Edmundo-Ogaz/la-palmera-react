import axios from 'axios';
import { getToken } from '../session/sessionStorage'

export const saveSync = async (code = '', name = '', cityCode = '') => {
	console.log(`saveSync fetch ${code} ${name} ${cityCode}`);
	const options = {
		method: 'POST',
		headers: {
		  Accept: 'application/json',
		  'Content-Type': 'application/json;charset=UTF-8',
		  'Authorization' : `Bearer ${getToken()} `
		},
		body: JSON.stringify({ code: code, name: name, cityCode: cityCode }),
	  };
	  try {
		const response = await fetch('http://localhost:8081/comunas', options)
		return response.json()
	} catch (error) {
	  console.error(error);
	  throw error
	}
};

export const updateSync = async (code = '', name = '', cityCode = '') => {
	console.log(`updateSync fetch ${code} ${name} ${cityCode}`);
	const options = {
		method: 'PUT',
		headers: {
		  Accept: 'application/json',
		  'Content-Type': 'application/json;charset=UTF-8',
		  'Authorization' : `Bearer ${getToken()} `
		},
		body: JSON.stringify({ code: code, name: name, cityCode: cityCode }),
	  };
	  try {
		const response = await fetch('http://localhost:8081/comunas', options)
		return response.json()
	} catch (error) {
	  console.error(error);
	  throw error
	}
};