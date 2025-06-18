import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { AuthGuard } from './core/guards/auth.guard';
import { authInterceptor } from './core/auth.interceptor';

export const appConfig = [
  provideRouter(routes),
  provideHttpClient(withInterceptors([authInterceptor]))
];