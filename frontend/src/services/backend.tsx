import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users`);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}

export const createUser = async (userData: any) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users`, userData);
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}

export const updateUser = async (id: number, data: any) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/users/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error actualizando usuario:', error);
        throw error;
    }
};
