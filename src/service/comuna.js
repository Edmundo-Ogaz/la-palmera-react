import axios from '../tools/customAxios';
import { comunasAdapter, comunaAdapter } from '../model/comunaModel'

export const getAll = () => {
  return axios
    .get('/comunas'
    )
};

export const search = async (comuna = '', ciudad = '') => {
	try {
		const response = await axios.get(
			`/comunas/search?comuna=${comuna}&ciudad=${ciudad}`)
		return comunasAdapter(response.data)
	} catch (error) {
		throw error
	}
};

export const save = async (code = '', name = '', cityCode = '') => {
	console.log(`saveSync ${code} ${name} ${cityCode}`);
	try {
	  	const response = await axios.post('/comunas', 
			{ code: code, name: name, cityCode: cityCode })
	  	return comunaAdapter(response.data)
	} catch (error) {
		console.error(error);
		throw error
	}
  }

export const update = async (code = '', name = '', cityCode = '') => {
	try {
		const response = await axios.put('/comunas', 
			{ code: code, name: name, cityCode: cityCode })
		return comunaAdapter(response.data)
	} catch (error) {
	  	console.error(error);
	  	throw error
	}
};

export const remove = (code) => {
	console.log(`remove code ${code}`)
	return axios
	  .delete(`/comunas/${code}`)
};