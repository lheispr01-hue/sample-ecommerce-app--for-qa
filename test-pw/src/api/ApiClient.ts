import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiClient {
  constructor(protected readonly request: APIRequestContext) {}

  get(path: string): Promise<APIResponse> {
    return this.request.get(this.url(path));
  }

  post(path: string, data?: unknown): Promise<APIResponse> {
    return this.request.post(this.url(path), { data });
  }

  // Strip the leading slash so the baseURL path prefix (/api/) is preserved.
  private url(path: string): string {
    return path.replace(/^\//, '');
  }
}
