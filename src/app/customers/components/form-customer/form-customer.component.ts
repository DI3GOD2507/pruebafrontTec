import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CustomersService } from "../../service/customer.service";

@Component({
  selector: 'app-form-customer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-customer.component.html',
  styleUrls: ['./form-customer.component.css']
})
export class FormCustomerComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private customersService = inject(CustomersService);

  form: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    companyName: ['', Validators.required]
  });

  isEditMode = false;
  id!: number;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.id = +params['id'];
        this.customersService.getById(this.id).subscribe(customer => {
          this.form.patchValue({
            firstName: customer.person?.firstName,
            lastName: customer.person?.lastName,
            email: customer.person?.email,
            phone: customer.person?.phone,
            companyName: customer.companyName
          });
        });
      }
    });
  }

  save() {
    if (this.form.invalid) return;

    const data = this.form.value;

    if (this.isEditMode) {
      this.customersService.update(this.id, data).subscribe(() => {
        this.router.navigate(['/customers']);
      });
    } else {
      this.customersService.create(data).subscribe(() => {
        this.router.navigate(['/customers']);
      });
    }
  }
}