import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CustomersService } from "../../../customers/service/customer.service";
import { Customer } from "../../../shared/models/customer.model";
import { OrdersService } from "../../service/orders.service";

@Component({
  selector: 'app-form-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-order.component.html',
  styleUrls: ['./form-order.component.css']
})
export class FormOrderComponent implements OnInit {
  private fb = inject(FormBuilder);
  private ordersService = inject(OrdersService);
  private customersService = inject(CustomersService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  form: FormGroup = this.fb.group({
    customerId: [null, Validators.required],
    description: ['', Validators.required],
    status: ['pending', Validators.required]
  });

  customers: Customer[] = [];
  isEditMode = false;
  id!: number;

  ngOnInit(): void {
    this.customersService.getAll().subscribe(data => this.customers = data);

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.id = +params['id'];
        this.ordersService.getById(this.id).subscribe(order => {
          this.form.patchValue(order);
        });
      }
    });
  }

  save(): void {
    if (this.form.invalid) return;

    const data = this.form.value;

    if (this.isEditMode) {
      this.ordersService.update(this.id, data).subscribe(() => {
        this.router.navigate(['/orders']);
      });
    } else {
      this.ordersService.create(data).subscribe(() => {
        this.router.navigate(['/orders']);
      });
    }
  }
}