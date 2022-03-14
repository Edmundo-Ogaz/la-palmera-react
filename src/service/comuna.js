import axios from 'axios';
import { getToken } from '../utils/common'
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