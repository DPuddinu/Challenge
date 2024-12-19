import { signal } from '@angular/core';

type TQueryParamValue = string | string[] | number | number[] | boolean | boolean[];
type TQueryParams = Record<string, TQueryParamValue>;

export abstract class BaseQueryParamsService<K> {
  protected queryParams = signal<TQueryParams | null>(null);

  protected constructor(protected readonly storageKey: string) {
    this.queryParams.set(this.getStoredQueryParams());
  }

  protected getQueryParamsString(queryParams: Record<string, TQueryParamValue>) {
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

  protected setQueryParam(key: keyof TQueryParams, value: TQueryParamValue) {
    const currentParams = this.getQueryParams();
    if (currentParams) {
      currentParams[key] = value;
      this.setQueryParams(currentParams);
    }
  }

  protected setQueryParams(params: TQueryParams) {
    this.queryParams.set(params);
    this.setStoredQueryParams(params);
  }

  protected getStoredQueryParams(): TQueryParams | null {
    const stored = sessionStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : null;
  }

  protected setStoredQueryParams(params: TQueryParams): void {
    sessionStorage.setItem(this.storageKey, JSON.stringify(params));
  }

  protected abstract fetchData(queryParams: TQueryParams | null, abortSignal: AbortSignal): K;
}
