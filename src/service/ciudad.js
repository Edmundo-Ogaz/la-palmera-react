import axios from 'axios';
import { getToken } from '../session/sessionStorage'
export const getAll = () => {
  return axios
    .get(`http://localhost:8081/ciudades`,
      { headers : { 'Authorization' : `Bearer ${ getToken() } ` } }
    )
};