import axios from "axios";

const Api = axios.create({baseURL: "http://localhost:8001"})

export const userChats = (id) => Api.get(`/chat/${id}`);
// export const createChat = (data) => Api.post('/chat/', data);


// export const findChat = (firstId, secondId) => Api.get(`/chat/find/${firstId}/${secondId}`);