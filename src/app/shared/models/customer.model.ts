import { Person } from "./person.model";

export interface Customer {
  id: number;
  personId: number;
  companyName: string;
  createdAt: string;
  updatedAt?: string;
  person?: Person;
}
