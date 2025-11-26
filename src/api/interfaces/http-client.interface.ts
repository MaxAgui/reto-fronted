export interface IHttpClient {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, data?: any): Promise<T>;
  put<T>(url: string, data?: any): Promise<T>;
  delete<T>(url: string): Promise<T>;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}
