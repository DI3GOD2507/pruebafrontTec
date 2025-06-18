import { Routes } from "@angular/router";
import { FormCustomerComponent } from "./components/form-customer/form-customer.component";
import { ListCustomersComponent } from "./components/list-customers/list-customers.component";

export const customersRoutes: Routes = [
  { path: '', component: ListCustomersComponent },
  { path: 'create', component: FormCustomerComponent },
  { path: 'edit/:id', component: FormCustomerComponent }
];