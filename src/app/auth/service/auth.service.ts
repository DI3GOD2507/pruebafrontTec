import { Injectable, signal } from "@angular/core";
import { from, switchMap, tap } from "rxjs";
import { BaseHttpService } from "../../core/services/http-client.service";
import { User } from "../../shared/models/user.model";

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseHttpService {
  currentUser = signal<User | null>(null);

  constructor() {
    super();
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (savedToken && savedUser) {
      this.currentUser.set(JSON.parse(savedUser));
    }
  }

  private async sha256(text: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(hash))); // base64
  }

login(email: string, password: string) {
  return this.http.post<{ token: string }>(`${this.apiAuth}/auth/login`, {
    email,
    passwordHash: password
  }).pipe(
    tap(response => {
      const user: User = { email, username: '', token: response.token };
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(user));
      this.currentUser.set(user);
    })
  );
}


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }
}