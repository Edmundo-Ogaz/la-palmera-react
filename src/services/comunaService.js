import axios from '../utils/customAxios';
import { comunasAdapter, comunaAdapter, comunaAdapterToApi } from '../model/comunaModel'

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

export const save = async (code = '', name = '', codeCity = '') => {
	console.log(`saveSync ${code} ${name} ${codeCity}`);
	try {
	  	const response = await axios.post('/comunas', 
		  comunaAdapterToApi({ code, name, codeCity }))
	  	return comunaAdapter(response.data)
	} catch (error) {
		console.error(error);
		throw error
	}
  }

export const update = async (code = '', name = '', codeCity = '') => {
	console.log('update service')
	try {
		const response = await axios.put('/comunas', 
			comunaAdapterToApi({ code, name, codeCity }))
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