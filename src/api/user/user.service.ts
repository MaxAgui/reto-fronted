import { api } from "../axiosInstance";
import { UserResponse } from "./user.types";

export class UserService {
  async getUser(): Promise<UserResponse> {
    const { data } = await api.get<UserResponse>("/user.json");
    return data;
  }
}

export const userService = new UserService();