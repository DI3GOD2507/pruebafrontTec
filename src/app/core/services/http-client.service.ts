import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export class BaseHttpService {
  protected http = inject(HttpClient);
  protected apiUrl = 'http://localhost:3000/api';
  protected apiAuth = 'http://localhost:3001/api' // ajustar según backend
}
