import { api } from "../api/axiosInstance";
import { AxiosHttpClient } from "../api/http-client/axios-client";
import { IHttpClient } from "../api/interfaces/http-client.interface";
import { IPlansService, IUserService } from "../api/interfaces/services.interface";
import { createPlansService } from "../api/plans/plans.service.refactored";
import { createUserService } from "../api/user/user.service.refactored";
import { AuthService, IAuthService } from "../services/auth.service";
import { IStorageService, SecureStorageService } from "../services/storage.service";

// Simple DI Container
class DIContainer {
  private services = new Map<string, any>();

  register<T>(key: string, factory: () => T): void {
    this.services.set(key, factory);
  }

  get<T>(key: string): T {
    const factory = this.services.get(key);
    if (!factory) {
      throw new Error(`Service ${key} not registered`);
    }
    return factory();
  }
}

// Create and configure container
export const container = new DIContainer();

// Register services
container.register<IHttpClient>('httpClient', () => new AxiosHttpClient(api));
container.register<IStorageService>('storageService', () => new SecureStorageService());

container.register<IPlansService>('plansService', () => 
  createPlansService(container.get<IHttpClient>('httpClient'))
);

container.register<IUserService>('userService', () => 
  createUserService(container.get<IHttpClient>('httpClient'))
);

container.register<IAuthService>('authService', () => 
  new AuthService(container.get<IStorageService>('storageService'))
);

// Export configured services
export const plansService = container.get<IPlansService>('plansService');
export const userService = container.get<IUserService>('userService');
export const authService = container.get<IAuthService>('authService');
