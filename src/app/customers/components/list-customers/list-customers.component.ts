import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Customer } from "../../../shared/models/customer.model";
import { CustomersService } from "../../service/customer.service";

@Component({
  selector: 'app-list-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})
export class ListCustomersComponent implements OnInit {
  private customersService = inject(CustomersService);
  private router = inject(Router);

  customers: Customer[] = [];

  ngOnInit(): void {
    this.customersService.getAll().subscribe(data => this.customers = data);
  }

  goToCreate() {
    this.router.navigate(['/customers/create']);
  }

  goToEdit(id: number) {
    this.router.navigate([`/customers/edit/${id}`]);
  }
}