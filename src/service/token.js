import axios from 'axios';
import { getToken } from "../session/sessionStorage"

export const verifyToken = (token) => {
  return axios
    .get(`http://localhost:8081/verifyToken?token=${getToken()}`
    )
};