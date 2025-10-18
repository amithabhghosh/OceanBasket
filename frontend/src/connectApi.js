import axios from 'axios'
const API = axios.create({
    baseURL: "https://myoceanbasket.in/api",
    withCredentials: true,  
});

export default API