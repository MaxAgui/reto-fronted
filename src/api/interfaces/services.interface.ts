import { PlansResponse } from "../plans/plans.types";
import { UserResponse } from "../user/user.types";

export interface IPlansService {
  getPlans(): Promise<PlansResponse>;
}

export interface IUserService {
  getUser(): Promise<UserResponse>;
}

// Interfaces específicas para diferentes necesidades
export interface IReadOnlyService<T> {
  get(): Promise<T>;
}

export interface ICrudService<T> extends IReadOnlyService<T> {
  create(item: T): Promise<T>;
  update(id: string, item: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}
