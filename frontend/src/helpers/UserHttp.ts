import { HttpClient } from '../helpers/http';
import { User } from '@/types/User';

const getUsers = async () => {
  try {
    const response = await HttpClient.get('http://localhost:8080/api/v1/users');
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const createUser = async (userData: User) => {
  try {
    const response = await HttpClient.post('http://localhost:8080/api/v1/createUser', userData);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (userId: number, userData: User) => {
  try {
    const response = await HttpClient.put(`http://localhost:8080/api/v1/users/${userId}`, userData);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = async (userId: number) => {}

