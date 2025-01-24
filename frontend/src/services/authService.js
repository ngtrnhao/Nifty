import api from './api';

const authService = {
    login: async(credentials) =>{
        try{
            const reponse = await api.post('/auth/login',credentials);
            return reponse.data;
        }catch(error){
            throw error.reponse.data;
        }
    },
    register:async(userData) =>{
        try{
            const response = await api.post('/auth/register',userData);
            return response.data;
        }catch(error){
            throw error.reponse.data;
        }
    },
    logout:() =>{
        localStorage.removeItem('token');
    }
}
export default authService;