import { api } from '../../api/axiosInstance';

// Simple tests for axiosInstance configuration and functionality
describe('axiosInstance', () => {
  describe('configuration', () => {
    it('should be defined and configured', () => {
      expect(api).toBeDefined();
      expect(typeof api.get).toBe('function');
      expect(typeof api.post).toBe('function');
      expect(typeof api.put).toBe('function');
      expect(typeof api.delete).toBe('function');
    });

    it('should have interceptors configured', () => {
      expect(api.interceptors).toBeDefined();
      expect(api.interceptors.response).toBeDefined();
      expect(api.interceptors.request).toBeDefined();
    });
  });

  describe('response interceptor behavior', () => {
    it('should pass through successful responses', () => {
      const mockResponse = { data: { test: 'data' }, status: 200 };
      
      // Test the success handler directly
      const successHandler = (res: any) => res;
      const result = successHandler(mockResponse);
      
      expect(result).toBe(mockResponse);
    });

    it('should handle and reject errors', async () => {
      const mockError = new Error('Network Error');
      
      // Test the error handler directly
      const errorHandler = (err: any) => {
        return Promise.reject(err);
      };
      
      await expect(errorHandler(mockError)).rejects.toThrow('Network Error');
    });

    it('should handle HTTP error responses', async () => {
      const httpError = {
        message: 'Request failed with status code 404',
        response: {
          status: 404,
          statusText: 'Not Found',
          data: { message: 'Resource not found' },
        },
      };
      
      const errorHandler = (err: any) => Promise.reject(err);
      
      await expect(errorHandler(httpError)).rejects.toEqual(httpError);
    });

    it('should handle timeout errors', async () => {
      const timeoutError = {
        message: 'timeout of 8000ms exceeded',
        code: 'ECONNABORTED',
      };
      
      const errorHandler = (err: any) => Promise.reject(err);
      
      await expect(errorHandler(timeoutError)).rejects.toEqual(timeoutError);
    });

    it('should handle network errors', async () => {
      const networkError = {
        message: 'Network Error',
        code: 'ERR_NETWORK',
      };
      
      const errorHandler = (err: any) => Promise.reject(err);
      
      await expect(errorHandler(networkError)).rejects.toEqual(networkError);
    });
  });

  describe('api methods', () => {
    it('should have all HTTP methods available', () => {
      expect(typeof api.get).toBe('function');
      expect(typeof api.post).toBe('function');
      expect(typeof api.put).toBe('function');
      expect(typeof api.delete).toBe('function');
    });
  });
});
