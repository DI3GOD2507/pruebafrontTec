import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Customer } from "../../shared/models/customer.model";
import { BaseHttpService } from "../../core/services/http-client.service";

@Injectable({ providedIn: 'root' })
export class CustomersService extends BaseHttpService {
  private endpoint = `${this.apiUrl}/customers`;

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.endpoint);
  }

  getById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.endpoint}/${id}`);
  }

  create(customer: Partial<Customer>): Observable<Customer> {
    return this.http.post<Customer>(this.endpoint, customer);
  }

  update(id: number, customer: Partial<Customer>): Observable<Customer> {
    return this.http.put<Customer>(`${this.endpoint}/${id}`, customer);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}
