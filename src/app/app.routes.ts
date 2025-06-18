import { Routes } from "@angular/router";
import { authRoutes } from "./auth/auth.routes";
import { AuthGuard } from "./core/guards/auth.guard";
import { customersRoutes } from "./customers/customers.routes";
import { dashboardRoutes } from "./dashboard/dashboard.routes";
import { ordersRoutes } from "./orders/orders.routes";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    children: authRoutes
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    children: dashboardRoutes
  },
  {
    path: 'customers',
    canActivate: [AuthGuard],
    children: customersRoutes
  },
  {
    path: 'orders',
    canActivate: [AuthGuard],
    children: ordersRoutes
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];