import axios from "axios";
const Api = axios.create({baseURL: "http://localhost:8001"})

export const getMessages = (id)=> Api.get(`./message/${id}`)
export const addMessage = (data) => Api.post('/message/', data);
