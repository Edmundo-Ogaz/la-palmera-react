import axios from 'axios';
import { getToken } from '../session/sessionStorage'
export const getAll = () => {
  return axios
    .get(`http://localhost:8081/comunas`,
      { headers : { 'Authorization' : `Bearer ${ getToken() } ` } }
    )
};

export const search = (comuna = '', ciudad = '') => {
  return axios
    .get(`http://localhost:8081/comunas/search`,
      { headers : { 'Authorization' : `Bearer ${ getToken() } ` } }
    )
};