import { api } from '../../api/axiosInstance';
import { UserService, userService } from '../../api/user/user.service';
import { UserResponse } from '../../api/user/user.types';

// Mock the axios instance
jest.mock('../../api/axiosInstance');
const mockedApi = api as jest.Mocked<typeof api>;

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    service = new UserService();
    jest.clearAllMocks();
  });

  describe('getUser', () => {
    it('should fetch user successfully', async () => {
      // Arrange
      const mockUserResponse: UserResponse = {
        name: 'Juan',
        lastName: 'Pérez',
        birthDay: '1990-05-15',
      };

      mockedApi.get.mockResolvedValue({ data: mockUserResponse });

      // Act
      const result = await service.getUser();

      // Assert
      expect(mockedApi.get).toHaveBeenCalledWith('/user.json');
      expect(mockedApi.get).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockUserResponse);
      expect(result.name).toBe('Juan');
      expect(result.lastName).toBe('Pérez');
      expect(result.birthDay).toBe('1990-05-15');
    });

    it('should fetch user with different data', async () => {
      // Arrange
      const mockUserResponse: UserResponse = {
        name: 'María',
        lastName: 'González',
        birthDay: '1985-12-03',
      };

      mockedApi.get.mockResolvedValue({ data: mockUserResponse });

      // Act
      const result = await service.getUser();

      // Assert
      expect(result.name).toBe('María');
      expect(result.lastName).toBe('González');
      expect(result.birthDay).toBe('1985-12-03');
    });

    it('should handle API errors', async () => {
      // Arrange
      const errorMessage = 'Network Error';
      mockedApi.get.mockRejectedValue(new Error(errorMessage));

      // Act & Assert
      await expect(service.getUser()).rejects.toThrow(errorMessage);
      expect(mockedApi.get).toHaveBeenCalledWith('/user.json');
    });

    it('should handle HTTP 404 error', async () => {
      // Arrange
      const httpError = {
        response: {
          status: 404,
          statusText: 'Not Found',
          data: { message: 'User not found' },
        },
      };
      mockedApi.get.mockRejectedValue(httpError);

      // Act & Assert
      await expect(service.getUser()).rejects.toEqual(httpError);
    });

    it('should handle HTTP 500 error', async () => {
      // Arrange
      const httpError = {
        response: {
          status: 500,
          statusText: 'Internal Server Error',
          data: { message: 'Server error' },
        },
      };
      mockedApi.get.mockRejectedValue(httpError);

      // Act & Assert
      await expect(service.getUser()).rejects.toEqual(httpError);
    });

    it('should handle timeout errors', async () => {
      // Arrange
      const timeoutError = new Error('timeout of 8000ms exceeded');
      mockedApi.get.mockRejectedValue(timeoutError);

      // Act & Assert
      await expect(service.getUser()).rejects.toThrow('timeout of 8000ms exceeded');
    });

    it('should handle malformed response data', async () => {
      // Arrange
      const malformedResponse = {
        name: null,
        lastName: undefined,
        birthDay: '',
      };

      mockedApi.get.mockResolvedValue({ data: malformedResponse });

      // Act
      const result = await service.getUser();

      // Assert
      expect(result).toEqual(malformedResponse);
      expect(result.name).toBeNull();
      expect(result.lastName).toBeUndefined();
      expect(result.birthDay).toBe('');
    });
  });

  describe('userService singleton', () => {
    it('should export a singleton instance', () => {
      expect(userService).toBeInstanceOf(UserService);
    });

    it('should use the same instance across calls', async () => {
      // Arrange
      const mockUserResponse: UserResponse = {
        name: 'Test',
        lastName: 'User',
        birthDay: '2000-01-01',
      };
      mockedApi.get.mockResolvedValue({ data: mockUserResponse });

      // Act
      const result1 = await userService.getUser();
      const result2 = await userService.getUser();

      // Assert
      expect(mockedApi.get).toHaveBeenCalledTimes(2);
      expect(result1).toEqual(result2);
    });

    it('should maintain state independence between calls', async () => {
      // Arrange
      const firstResponse: UserResponse = {
        name: 'First',
        lastName: 'User',
        birthDay: '1990-01-01',
      };
      const secondResponse: UserResponse = {
        name: 'Second',
        lastName: 'User',
        birthDay: '1995-01-01',
      };

      mockedApi.get
        .mockResolvedValueOnce({ data: firstResponse })
        .mockResolvedValueOnce({ data: secondResponse });

      // Act
      const result1 = await userService.getUser();
      const result2 = await userService.getUser();

      // Assert
      expect(result1.name).toBe('First');
      expect(result2.name).toBe('Second');
      expect(result1).not.toEqual(result2);
    });
  });
});
