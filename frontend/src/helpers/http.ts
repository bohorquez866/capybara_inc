import axios, { AxiosResponse } from 'axios';
import { ApiResponse, ApiError, RequestOptions } from '@/types/http';

export const HttpClient = {
  get: async <T>(url: string, options?: RequestOptions): Promise<AxiosResponse<ApiResponse<T>>> => {
    try {
      const response = await axios.get<ApiResponse<T>>(url, options);
      return response;
    } catch (error) {
      throw formatError(error);
    }
  },


  post: async <T>(url: string, data?: any, options?: RequestOptions): Promise<AxiosResponse<ApiResponse<T>>> => {
    try {
      const response = await axios.post<ApiResponse<T>>(url, data, options);
      return response;
    } catch (error) {
      throw formatError(error);
    }
  },

  
  put: async <T>(url: string, data?: any, options?: RequestOptions): Promise<AxiosResponse<ApiResponse<T>>> => {
    try {
      const response = await axios.put<ApiResponse<T>>(url, data, options);
      return response;
    } catch (error) {
      throw formatError(error);
    }
  },

  
  delete: async <T>(url: string, options?: RequestOptions): Promise<AxiosResponse<ApiResponse<T>>> => {
    try {
      const response = await axios.delete<ApiResponse<T>>(url, options);
      return response;
    } catch (error) {
      throw formatError(error);
    }
  },
};




const formatError = (error: any): ApiError => {
  if (error.response) {
    return { message: error.response.data.message, status: error.response.status };
  } else if (error.request) {
    return { message: 'No response received from server', status: 0 };
  } else {
    return { message: error.message };
  }
};
