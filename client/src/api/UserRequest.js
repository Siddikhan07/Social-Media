import axios from "axios";

const Api = axios.create({baseURL: "http://localhost:8001"})


export const getUser = (userId)=> Api.get(`/user/${userId}`);
export const updateUser = (id, formData)=> Api.put(`/user/${id}`, formData)
export const getAllUser = ()=> Api.get('/user');
export const followUser = (id,data)=> Api.put(`/user/${id}/follow`,data)
export const unFollowUser = (id,data)=> Api.put(`/user/${id}/unfollow`,data)

// Api.interceptors.request.use((req)=>{
//     if(localStorage.getItem('profile')){
//         req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile').token)}`
//     }
//     return req;
// })
