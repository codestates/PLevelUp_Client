import axios from 'axios';
import { SERVER_HOST } from '../config';

const api = axios.create();
api.defaults.baseURL = SERVER_HOST;
export default api;
