import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseHttpService } from "../../core/services/http-client.service";
import { Order } from "../../shared/models/order.model";

@Injectable({ providedIn: 'root' })
export class OrdersService extends BaseHttpService {
  private endpoint = this.apiUrl + '/orders';  // 🔧 Evitamos interpolación aquí

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.endpoint);
  }

  getById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.endpoint}/${id}`);
  }

  create(order: Partial<Order>): Observable<Order> {
    return this.http.post<Order>(this.endpoint, order);
  }

  update(id: number, order: Partial<Order>): Observable<Order> {
    return this.http.put<Order>(`${this.endpoint}/${id}`, order);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}