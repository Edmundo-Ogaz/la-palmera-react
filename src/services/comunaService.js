import axios from '../utils/customAxios';
import { comunasAdapter, comunaAdapter, comunaAdapterToApi } from '../model/comunaModel'

export const getAll = () => {
  return axios
    .get(`${process.env.REACT_APP_ENDPOINT_COMUNAS_GET_ALL}`
    )
};

export const search = async (comuna = '', ciudad = '') => {
	try {
		const response = await axios.get(
			`${process.env.REACT_APP_ENDPOINT_COMUNAS_SEARCH}?comuna=${comuna}&ciudad=${ciudad}`)
		return comunasAdapter(response.data)
	} catch (error) {
		throw error
	}
};

export const save = async (code = '', name = '', codeCity = '') => {
	console.log(`saveSync ${code} ${name} ${codeCity}`);
	try {
	  	const response = await axios.post(`${process.env.REACT_APP_ENDPOINT_COMUNAS_POST_SAVE}`, 
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
		const response = await axios.put(`${process.env.REACT_APP_ENDPOINT_COMUNAS_PUT_UPDATE}`, 
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
	  .delete(`${process.env.REACT_APP_ENDPOINT_COMUNAS_DELETE_BY_ID}${code}`)
};