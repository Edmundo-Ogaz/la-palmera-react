import axios from 'axios';

import { getToken } from '../services/sessionStorage'
import { verifyToken } from '../services/tokenService'
// const axios = require('axios');

// Step-1: Create a new Axios instance with a custom config.
// The timeout is set to 10s. If the request takes longer than
// that then the request will be aborted.
const customAxios = axios.create({
    baseURL: 'http://localhost:8081',
    timeout: 10000,
});

// Step-2: Create request, response & error handlers
const requestHandler = async request => {
    console.log('resquestHandler')
    const token = getToken()
    try {
        const response = await verifyToken(token)
        if (response) {
            request.headers.Authorization = `Bearer ${token} `
            return request;
        }
        throw new Error('VALIDATION_TOKEN_ERROR')
    } catch(err) { 
        throw err 
    }
};

const responseHandler = response => {
    console.log('responseHandler')
    if (response.status === 401) {
        window.location = '/login';
    }

    return response;
};

const errorHandler = error => {
    console.log('errorHandler')
    window.location = '/login';
};

customAxios.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
);

export default customAxios;