import axios from 'axios';
import store from "../redux/store"


const apiURL = "http://localhost:3500";
const mainAxios = axios.create({
    baseURL: `${apiURL}`
})

mainAxios.interceptors.request.use( (config) => {
    const axiosState =  JSON.parse(localStorage.getItem('nw_app'))
    config.headers["authorization"] = axiosState.session
    return config
})


export default mainAxios