import axios from 'axios';
import { getToken } from '../utils/common'
export const getAll = () => {
  return axios
    .get(`http://localhost:8081/ciudades`,
      { headers : { 'Authorization' : `Bearer ${ getToken() } ` } }
    )
};