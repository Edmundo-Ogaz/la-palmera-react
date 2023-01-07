import axios from '../utils/customAxios';
import { citiesAdapter, cityAdapter, cityAdapterToApi } from '../model/cityModel'

export const getAll = () => {
  return axios
    .get(`${process.env.REACT_APP_ENDPOINT_CIUDAD_GETALL}`)
};

export const search = async (city = '', region = '') => {
	try {
		const response = await axios.get(
			`${process.env.REACT_APP_ENDPOINT_CIUDAD_SEARCH}?ciudad=${city}&region=${region}`)
		return citiesAdapter(response.data)
	} catch (error) {
		throw error
	}
};

export const save = async (code = '', name = '', codeRegion = '') => {
	console.log(`saveSync ${code} ${name} ${codeRegion}`);
	try {
	  	const response = await axios.post(`${process.env.REACT_APP_ENDPOINT_CIUDAD_POST_SAVE}`, 
		  cityAdapterToApi({ code, name, codeRegion }))
	  	return cityAdapter(response.data)
	} catch (error) {
		console.error(error);
		throw error
	}
  }

export const update = async (code = '', name = '', codeRegion = '') => {
	console.log('update service')
	try {
		const response = await axios.put(`${process.env.REACT_APP_ENDPOINT_CIUDAD_PUT_UPDATE}`, 
			cityAdapterToApi({ code, name, codeRegion }))
		return cityAdapter(response.data)
	} catch (error) {
	  	console.error(error);
	  	throw error
	}
};

export const remove = (code) => {
	console.log(`remove code ${code}`)
	return axios
	  .delete(`${process.env.REACT_APP_ENDPOINT_CIUDAD_DELETE_BY_ID}${code}`)
};