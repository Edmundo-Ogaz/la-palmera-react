import axios from '../utils/customAxios';

export const getAll = () => {
  return axios
    .get(`${process.env.REACT_APP_ENDPOINT_REGION_GETALL}`)
};