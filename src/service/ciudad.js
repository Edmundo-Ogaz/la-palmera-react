import axios from '../tools/customAxios';

export const getAll = () => {
  return axios
    .get('/ciudades')
};