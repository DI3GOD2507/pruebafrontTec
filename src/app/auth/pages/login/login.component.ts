import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', Validators.required]
  });

  loading = false;
  error: string | null = null;

  login(): void {
    if (this.form.invalid) return;

    this.loading = true;
    this.authService.login(
      this.form.value.email,
      this.form.value.password
    ).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: err => {
        this.error = 'Credenciales inválidas';
        this.loading = false;
      }
    });
  }
}
