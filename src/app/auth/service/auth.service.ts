import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { tap } from "rxjs";
import { User } from "../../shared/models/user.model";
import { BaseHttpService } from "../../core/services/http-client.service";

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseHttpService {
  currentUser = signal<User | null>(null);

  login(email: string, password: string) {
    return this.http.post<User>(`${this.apiAuth}/auth/login`, { email, password }).pipe(
      tap(user => {
        localStorage.setItem('token', user.token!);
        this.currentUser.set(user);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser.set(null);
  }

  get token() {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}