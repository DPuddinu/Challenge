import { Trip } from '@/models/trip.types';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { catchError, map, of } from 'rxjs';

export type ResolverResponse =
  | {
      status: 'success';
      data: Trip;
    }
  | {
      status: 'error';
      message: string;
    };

export const tripDetailResolver: ResolveFn<ResolverResponse> = route => {
  const http = inject(HttpClient);
  return http.get<Trip>(`/trips/${route.params['id']}`).pipe(
    map(data => ({ status: 'success', data }) as ResolverResponse),
    catchError(err => {
      return of({
        status: 'error',
        message: err.message
      } as ResolverResponse);
    })
  );
};
