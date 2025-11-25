export interface PlanItem {
  name: string;
  price: number;
  age: number;
  description: string[];
}

export interface PlansResponse {
  list: PlanItem[];
}
