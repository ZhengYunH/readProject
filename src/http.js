import axios from 'axios'
import store from './store'
import * as types from './store/mutation-types'
import router from './router'

axios.defaults.timeout = 50000;
axios.defaults.baseURL = '/backend/';
axios.defaults.headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
}

axios.interceptors.request.use(
    config => {
        return config;
    },
    err => {
        return Promise.reject(err);
    });

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error)
    });

export default axios;
