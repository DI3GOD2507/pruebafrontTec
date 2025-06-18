import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  stats = {
    totalOrders: 120,
    completedOrders: 80,
    pendingOrders: 30,
    activeCustomers: 50
  };
}