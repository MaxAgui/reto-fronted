import { AxiosInstance } from "axios";
import { IHttpClient } from "../interfaces/http-client.interface";

export class AxiosHttpClient implements IHttpClient {
  constructor(private axiosInstance: AxiosInstance) {}

  async get<T>(url: string): Promise<T> {
    const response = await this.axiosInstance.get<T>(url);
    return response.data;
  }

  async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data);
    return response.data;
  }

  async put<T>(url: string, data?: any): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url);
    return response.data;
  }
}
