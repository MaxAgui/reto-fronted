import { api } from "../axiosInstance";
import { PlansResponse } from "./plans.types";

export class PlansService {
  async getPlans(): Promise<PlansResponse> {
    const { data } = await api.get<PlansResponse>("/plans.json");
    return data;
  }
}

export const plansService = new PlansService();