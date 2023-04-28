export interface ApiResponse {
    message: string;
    data?: any;
  }
  
 export interface ApiError {
    message: string;
    status?: number;
  }
  
export interface RequestOptions {
    params?: any;
    headers?: any;
    timeout?: number;
  }