import { IHttpClient } from "../interfaces/http-client.interface";
import { IPlansService } from "../interfaces/services.interface";
import { PlansResponse } from "./plans.types";

export class PlansService implements IPlansService {
  constructor(private httpClient: IHttpClient) {}

  async getPlans(): Promise<PlansResponse> {
    return await this.httpClient.get<PlansResponse>("/plans.json");
  }
}

// Factory para crear el servicio con dependencias
export const createPlansService = (httpClient: IHttpClient): IPlansService => {
  return new PlansService(httpClient);
};
