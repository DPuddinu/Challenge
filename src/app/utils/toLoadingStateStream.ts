import { catchError, map, Observable, of, startWith } from "rxjs";

export interface Loading {
  state: 'loading';
}

export interface Loaded<T> {
  state: 'loaded';
  data: T;
}

export interface ErrorState {
  state: 'error';
  error: Error;
}

export type LoadingState<T = unknown> = Loading | Loaded<T> | ErrorState;



export function toLoadingStateStream<T>(source$: Observable<T>): Observable<LoadingState<T>> {
  return source$.pipe(
    map(data => ({ state: 'loaded', data }) as Loaded<T>),
    catchError(error => of({ state: 'error', error } as ErrorState)),
    startWith({ state: 'loading' } as Loading)
  );
}
