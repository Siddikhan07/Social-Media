import axios from "axios";

const Api = axios.create({baseURL: "http://localhost:8001"})

export const logIn = (formData)=> Api.post('/auth/login', formData);
export const signUp = (formData)=> Api.post('/auth/register', formData);
