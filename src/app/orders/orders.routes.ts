import { Routes } from "@angular/router";
import { FormOrderComponent } from "./components/form-order/form-order.component";
import { ListOrdersComponent } from "./components/list-orders/list-orders.component";

export const ordersRoutes: Routes = [
  { path: '', component: ListOrdersComponent },
  { path: 'create', component: FormOrderComponent },
  { path: 'edit/:id', component: FormOrderComponent }
];