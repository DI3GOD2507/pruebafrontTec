import { Customer } from "./customer.model";

export interface Order {
  id: number;
  customerId: number;
  status: 'pending' | 'completed' | 'cancelled';
  description: string;
  createdAt: string;
  updatedAt?: string;
  customer?: Customer;
}
