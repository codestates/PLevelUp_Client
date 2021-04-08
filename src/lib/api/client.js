import axios from 'axios';

const client = axios.create();
client.defaults.baseURL = 'http://localhost:5000/';
client.defaults.withCredentials = true;
export default client;
