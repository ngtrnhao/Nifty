import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:2002/api',
    header:{
        'Content-type': 'application/json'
    }
});
 //Thêm interceptor để tự động gắn token vào header
 api.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem('token');
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) =>{
        return Promise.reject(error); //Promise có 3 trạng thái : Pending(chờ), Fulfilled(Hoàn thành), Reject(từ chối)
    }
 );
 export default api;