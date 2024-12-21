import { Location } from '@angular/common';
import { inject, signal } from '@angular/core';
import { Router } from '@angular/router';

export type TQueryParamValue = string | string[] | number | number[] | boolean | boolean[];
export type TQueryParams = Record<string, TQueryParamValue>;

export abstract class BaseQueryParamsService<K> {
  private readonly queryParams = signal<TQueryParams | null>(null);
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  constructor(protected readonly storageKey: string) {
    const storedParams = this.getStoredQueryParams();
    if (storedParams) {
      this.queryParams.set(storedParams);
    }
  }

  getQueryParamsString(queryParams: Record<string, TQueryParamValue>) {
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

  setQueryParam(key: keyof TQueryParams, value: TQueryParamValue) {
    if (!value) return;
    this.queryParams.update(current => {
      const newParams = {
        ...current,
        [key]: value
      };
      this.setStoredQueryParams(newParams);
      this.updateUrl(newParams);
      return newParams;
    })
  }

  setQueryParams(params: TQueryParams) {
    this.queryParams.update(current => {
      if(!current) return params;
      const newParams = {
        ...current,
        ...params
      }
      this.setStoredQueryParams(newParams);
      this.updateUrl(newParams);
      return newParams
    })
  }
  clearQueryParams(){
    this.queryParams.set(null);
    this.deleteStoredQueryParams();
    this.router.navigate(
      [], 
      {
        relativeTo: this.router.routerState.root,
        queryParams: {},
        replaceUrl: true
      }
    );
  }

  private updateUrl(params: TQueryParams): void {
    const urlTree = this.router.createUrlTree([], {
      queryParams: params,
      queryParamsHandling: 'merge'
    });
    this.location.go(urlTree.toString());
  }

  getStoredQueryParams(): TQueryParams | null {
    const stored = sessionStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : null;
  }
  protected deleteStoredQueryParams(){
    sessionStorage.removeItem(this.storageKey);
  }
  protected setStoredQueryParams(params: TQueryParams): void {
    sessionStorage.setItem(this.storageKey, JSON.stringify(params));
  }

  protected abstract fetchData(queryParams: TQueryParams | null, abortSignal: AbortSignal): K;
}
