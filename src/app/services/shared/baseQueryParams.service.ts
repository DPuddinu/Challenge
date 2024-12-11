import { signal } from '@angular/core';

export abstract class BaseQueryParamsService<T, K> {
  protected queryParams = signal<T | null>(null);

  protected constructor(protected readonly storageKey: string) {
    this.queryParams.set(this.getStoredQueryParams());
  }

  protected getQueryParamsString(
    queryParams: Record<string, string | string[] | number | number[] | boolean | boolean[]>
  ) {
    const queryParamsString = Object.entries(queryParams)
      .map(([key, value]) => {
        const paramValue = Array.isArray(value) ? value.join(',') : value;
        return `${key}=${encodeURIComponent(paramValue)}`;
      })
      .join('&');
    return queryParamsString;
  }

  protected getQueryParams() {
    return this.queryParams();
  }

  protected setQueryParams(params: T) {
    this.queryParams.set(params);
    this.setStoredQueryParams(params);
  }

  protected getStoredQueryParams(): T | null {
    const stored = sessionStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : null;
  }

  protected setStoredQueryParams(params: T): void {
    sessionStorage.setItem(this.storageKey, JSON.stringify(params));
  }

  protected abstract fetchData(queryParams: T | null, abortSignal: AbortSignal): K;
}
