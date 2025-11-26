import { IHttpClient } from "../interfaces/http-client.interface";
import { IUserService } from "../interfaces/services.interface";
import { UserResponse } from "./user.types";

export class UserService implements IUserService {
  constructor(private httpClient: IHttpClient) {}

  async getUser(): Promise<UserResponse> {
    return await this.httpClient.get<UserResponse>("/user.json");
  }
}

// Factory para crear el servicio con dependencias
export const createUserService = (httpClient: IHttpClient): IUserService => {
  return new UserService(httpClient);
};
