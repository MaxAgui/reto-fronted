import { api } from '../../api/axiosInstance';
import { PlansService, plansService } from '../../api/plans/plans.service';
import { PlanItem, PlansResponse } from '../../api/plans/plans.types';

// Mock the axios instance
jest.mock('../../api/axiosInstance');
const mockedApi = api as jest.Mocked<typeof api>;

describe('PlansService', () => {
  let service: PlansService;

  beforeEach(() => {
    service = new PlansService();
    jest.clearAllMocks();
  });

  describe('getPlans', () => {
    it('should fetch plans successfully', async () => {
      // Arrange
      const mockPlanItem: PlanItem = {
        name: 'Plan Básico',
        price: 160,
        age: 56,
        description: ['Rimac', 'Cobertura básica', 'Atención médica'],
      };

      const mockPlansResponse: PlansResponse = {
        list: [mockPlanItem],
      };

      mockedApi.get.mockResolvedValue({ data: mockPlansResponse });

      // Act
      const result = await service.getPlans();

      // Assert
      expect(mockedApi.get).toHaveBeenCalledWith('/plans.json');
      expect(mockedApi.get).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockPlansResponse);
      expect(result.list).toHaveLength(1);
      expect(result.list[0].name).toBe('Plan Básico');
    });

    it('should fetch multiple plans successfully', async () => {
      // Arrange
      const mockPlans: PlanItem[] = [
        {
          name: 'Plan Básico',
          price: 160,
          age: 56,
          description: ['Rimac', 'Cobertura básica'],
        },
        {
          name: 'Plan Avanzado',
          price: 200,
          age: 40,
          description: ['Rimac', 'Cobertura completa'],
        },
      ];

      const mockPlansResponse: PlansResponse = {
        list: mockPlans,
      };

      mockedApi.get.mockResolvedValue({ data: mockPlansResponse });

      // Act
      const result = await service.getPlans();

      // Assert
      expect(result.list).toHaveLength(2);
      expect(result.list[0].name).toBe('Plan Básico');
      expect(result.list[1].name).toBe('Plan Avanzado');
    });

    it('should handle empty plans list', async () => {
      // Arrange
      const mockPlansResponse: PlansResponse = {
        list: [],
      };

      mockedApi.get.mockResolvedValue({ data: mockPlansResponse });

      // Act
      const result = await service.getPlans();

      // Assert
      expect(result.list).toHaveLength(0);
      expect(result.list).toEqual([]);
    });

    it('should handle API errors', async () => {
      // Arrange
      const errorMessage = 'Network Error';
      mockedApi.get.mockRejectedValue(new Error(errorMessage));

      // Act & Assert
      await expect(service.getPlans()).rejects.toThrow(errorMessage);
      expect(mockedApi.get).toHaveBeenCalledWith('/plans.json');
    });

    it('should handle HTTP error responses', async () => {
      // Arrange
      const httpError = {
        response: {
          status: 404,
          statusText: 'Not Found',
          data: { message: 'Plans not found' },
        },
      };
      mockedApi.get.mockRejectedValue(httpError);

      // Act & Assert
      await expect(service.getPlans()).rejects.toEqual(httpError);
    });

    it('should handle timeout errors', async () => {
      // Arrange
      const timeoutError = new Error('timeout of 8000ms exceeded');
      mockedApi.get.mockRejectedValue(timeoutError);

      // Act & Assert
      await expect(service.getPlans()).rejects.toThrow('timeout of 8000ms exceeded');
    });
  });

  describe('plansService singleton', () => {
    it('should export a singleton instance', () => {
      expect(plansService).toBeInstanceOf(PlansService);
    });

    it('should use the same instance across calls', async () => {
      // Arrange
      const mockPlansResponse: PlansResponse = { list: [] };
      mockedApi.get.mockResolvedValue({ data: mockPlansResponse });

      // Act
      const result1 = await plansService.getPlans();
      const result2 = await plansService.getPlans();

      // Assert
      expect(mockedApi.get).toHaveBeenCalledTimes(2);
      expect(result1).toEqual(result2);
    });
  });
});
