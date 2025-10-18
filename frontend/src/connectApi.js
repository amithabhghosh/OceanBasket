import axios from 'axios'
const API = axios.create({
    baseURL: "http://13.202.244.73/api/api",
    withCredentials: true,  
});

export default API