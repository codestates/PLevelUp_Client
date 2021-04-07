import axios from 'axios';
import { SERVER_HOST } from '../config';

const api = axios.create();
api.defaults.baseURL = SERVER_HOST;
api.defaults.withCredentials = true;
export default api;
