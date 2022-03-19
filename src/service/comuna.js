import axios from 'axios';
import { getToken } from '../session/sessionStorage'
import { comunasAdapter, comunaAdapter } from '../model/comunaModel'
export const getAll = () => {
  return axios
    .get('http://localhost:8081/comunas',
      { headers : { 'Authorization' : `Bearer ${getToken()} ` } }
    )
};

export const search = async (comuna = '', ciudad = '') => {
	try {
		const response = await axios.get(
			`http://localhost:8081/comunas/search?comuna=${comuna}&ciudad=${ciudad}`,
			{ headers : { 'Authorization' : `Bearer ${getToken()} ` } }
		)
		return comunasAdapter(response.data)
	} catch (error) {
		throw error
	}
};

export const save = async (code = '', name = '', cityCode = '') => {
	console.log(`saveSync ${code} ${name} ${cityCode}`);
	try {
	  	const response = await axios.post('http://localhost:8081/comunas', 
			{ code: code, name: name, cityCode: cityCode },
			{ headers : { 'Authorization' : `Bearer ${getToken()} ` } }
		)
	  	return comunaAdapter(response.data)
	} catch (error) {
		console.error(error);
		throw error
	}
  }

export const update = async (code = '', name = '', cityCode = '') => {
	try {
		const response = await axios.put('http://localhost:8081/comunas', 
			{ code: code, name: name, cityCode: cityCode },
			{ headers : { 'Authorization' : `Bearer ${getToken()} ` } }
		)
		return comunaAdapter(response.data)
	} catch (error) {
	  	console.error(error);
	  	throw error
	}
};

export const remove = (code) => {
	console.log(`remove code ${code}`)
	return axios
	  .delete(`http://localhost:8081/comunas/${code}`,
		{ headers : { 'Authorization' : `Bearer ${getToken()} ` } }
	)
};