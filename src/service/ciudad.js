import axios from '../utils/customAxios';

export const getAll = () => {
  return axios
    .get('/ciudades')
};