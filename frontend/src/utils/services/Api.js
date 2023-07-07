  
import axios from 'axios';

const url = 'https://ashish06.onrender.com/';

export const addUser = async (data) => {
    // try {
    //     let response = await axios.post(`${url}/add`, data);
    //     return response.data;
    // } catch (error) {
    //     console.log('Error while calling addUser API ', error);
    // }
}

export const getAllUsers = async (account) => {
    try {
        let response = await axios.get(`${url}api/users`);
        let index=response.data.findIndex((user)=>user?._id === account?._id)
         response.data.splice(index, 1);
        return response.data;
    } catch (error) {
        console.log('Error while calling getUsers API ', error);
    }
}

export const setConversation = async (data) => {
    try {
        await axios.post(`${url}api/chats/conversation/add`, data);
    } catch (error) {
        console.log('Error while calling setConversation API ', error);
    }
}

export const getConversation = async (users) => {
    try {
        let response = await axios.post(`${url}api/chats/conversation/get`, users);
        return response.data;
    } catch (error) {
        console.log('Error while calling getConversation API ', error);
    }
}

export const getMessages = async (id) => {
    try {
        let response = await axios.get(`${url}api/chats/message/get/${id}`);
        return response.data
    } catch (error) {
        console.log('Error while calling getMessages API ', error);
    }
}

export const newMessages = async (data) => {
    try {
        return await axios.post(`${url}api/chats/message/add`, data);
    } catch (error) {
        console.log('Error while calling newConversations API ', error);
    }
}

export const uploadFile = async (data) => {
    try {
        return await axios.post(`${url}api/chats/file/upload`, data);
    } catch (error) {
        console.log('Error while calling newConversations API ', error);
    }
}