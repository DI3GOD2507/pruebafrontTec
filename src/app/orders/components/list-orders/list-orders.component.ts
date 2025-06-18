import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { RouterModule, Router } from "@angular/router";
import { Order } from "../../../shared/models/order.model";
import { OrdersService } from "../../service/orders.service";

@Component({
  selector: 'app-list-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent implements OnInit {
  private ordersService = inject(OrdersService);
  private router = inject(Router);

  orders: Order[] = [];

  ngOnInit(): void {
    this.ordersService.getAll().subscribe(data => this.orders = data);
  }

  goToCreate(): void {
    this.router.navigate(['/orders/create']);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/orders/edit', id]);
  }
}