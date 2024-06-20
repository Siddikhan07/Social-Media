import axios from "axios";

const Api = axios.create({baseURL: "http://localhost:8001"})

export const getTimelinePosts = (id)=> Api.get(`/post/${id}/timeline`)
export const likePost = (id,userId)=>Api.put(`/post/${id}/like`,{userId: userId})

