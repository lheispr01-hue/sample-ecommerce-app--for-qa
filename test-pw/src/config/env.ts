import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const env = {
  baseUrl: process.env.BASE_URL ?? 'http://localhost',
  apiBaseUrl: process.env.API_BASE_URL ?? 'http://localhost/api',
  demoUser: {
    username: process.env.DEMO_USERNAME ?? 'demo',
    password: process.env.DEMO_PASSWORD ?? 'password1',
  },
};
