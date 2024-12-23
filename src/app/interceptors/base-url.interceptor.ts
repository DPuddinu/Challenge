import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'environments/environment.dev';
import { tap, throwError } from 'rxjs';
import { catchError } from 'rxjs';

export const baseUrlInterceptor: HttpInterceptorFn = (request, next) => {
  // Construct the URL with base URL from environment
  const apiRequest = request.clone({
    url: `${environment.apiUrl}${request.url}`
  });
  return next(apiRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      // Log API errors in development
      if (!environment.production) {
        console.error('API Error:', {
          url: apiRequest.url,
          method: apiRequest.method,
          error
        });
      }
      return throwError(() => error);
    }),
    tap(req => console.log(req))
  );
};
