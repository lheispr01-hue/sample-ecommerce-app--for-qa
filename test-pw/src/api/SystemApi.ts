import { APIResponse } from '@playwright/test';
import { ApiClient } from './ApiClient';

export class SystemApi extends ApiClient {
  health(): Promise<APIResponse> {
    return this.get('health');
  }

  resetDemo(): Promise<APIResponse> {
    return this.post('demo/reset');
  }
}
