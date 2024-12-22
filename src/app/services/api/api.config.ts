import { environment } from 'environments/environment.dev';

export interface FetchConfig extends RequestInit {
  baseURL?: string;
  params?: Record<string, string | number>;
  signal?: AbortSignal;
}


export class FetchError extends Error {
  constructor(
    public response: Response,
    public data: unknown
  ) {
    super(`HTTP Error ${response.status}`);
  }
}

export async function fetchApi<T>(endpoint: string, config: FetchConfig = {}): Promise<T> {
  const {
    baseURL = environment.apiUrl,
    params,
    headers = {},
    signal,
    ...restConfig
  } = config;

  // Build URL with query parameters
  const path = `${baseURL}${endpoint}`
  const url = new URL(path);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value.toString());
    });
  }

  const defaultHeaders: HeadersInit = {
    ...headers
  };

  try {
    const response = await fetch(url.toString(), {
      ...restConfig,
      headers: defaultHeaders,
      signal,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new FetchError(response, errorData);
    }

    const data = (await response.json()) as T;

    return data;
  } catch (error) {
    if (error instanceof FetchError) {
      throw error;
    }
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('Request aborted');
    }
    throw new Error('Network error');
  }
}

export const http = {
  get: <T>(endpoint: string, config?: FetchConfig) => 
    fetchApi<T>(endpoint, { ...config, method: 'GET' }),

  post: <T>(endpoint: string, data?: unknown, config?: FetchConfig) =>
    fetchApi<T>(endpoint, {
      ...config,
      method: 'POST',
      body: JSON.stringify(data)
    }),

  put: <T>(endpoint: string, data?: unknown, config?: FetchConfig) =>
    fetchApi<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: JSON.stringify(data)
    }),

  patch: <T>(endpoint: string, data?: unknown, config?: FetchConfig) =>
    fetchApi<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: JSON.stringify(data)
    }),

  delete: <T>(endpoint: string, config?: FetchConfig) =>
    fetchApi<T>(endpoint, { ...config, method: 'DELETE' })
}; 