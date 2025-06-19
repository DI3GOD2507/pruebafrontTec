import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export class BaseHttpService {
  protected http = inject(HttpClient);
  protected apiUrl = 'http://127.0.0.1:8000';
  protected apiAuth = 'https://localhost:5020/api' // ajustar según backend
}
