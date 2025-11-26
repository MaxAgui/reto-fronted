import { UserResponse } from "../api/user/user.types";
import { IStorageService } from "./storage.service";

export interface LoginData {
  document: string;
  phoneNumber?: string;
  documentType?: string;
}

export interface AuthUser extends UserResponse {
  documentNumber: string;
  phoneNumber?: string;
  documentType?: string;
}

export interface IAuthService {
  login(loginData: LoginData, user: UserResponse): Promise<{ user: AuthUser; token: string }>;
  logout(): Promise<void>;
  getStoredSession(): Promise<{ user: AuthUser | null; token: string | null }>;
}

export class AuthService implements IAuthService {
  constructor(private storageService: IStorageService) {}

  async login(loginData: LoginData, apiUser: UserResponse): Promise<{ user: AuthUser; token: string }> {
    const userWithFormData: AuthUser = {
      ...apiUser,
      documentNumber: loginData.document,
      phoneNumber: loginData.phoneNumber,
      documentType: loginData.documentType
    };

    const fakeToken = "token_" + new Date().getTime();

    await this.storageService.setItem("token", fakeToken);
    await this.storageService.setItem("user", JSON.stringify(userWithFormData));

    return { user: userWithFormData, token: fakeToken };
  }

  async logout(): Promise<void> {
    await this.storageService.removeItem("token");
    await this.storageService.removeItem("user");
  }

  async getStoredSession(): Promise<{ user: AuthUser | null; token: string | null }> {
    const savedToken = await this.storageService.getItem("token");
    const savedUserStr = await this.storageService.getItem("user");
    
    const savedUser = savedUserStr ? JSON.parse(savedUserStr) : null;

    return { user: savedUser, token: savedToken };
  }
}
