import { TMarketResponse } from './types';

export const API_URL = 'http://localhost:3000';
export const MARKETS_URLS: string[] = [`${API_URL}/first`, `${API_URL}/second`, `${API_URL}/third`];
export const MARKETS_POLLING_URLS: string[] = MARKETS_URLS.map((url) => `${url}/poll`);

export const DEFAULT_VALUES: TMarketResponse = {
  base: '',
  date: '',
  rates: {
    EUR: 0,
    RUB: 0,
    USD: 0,
  },
  timestamp: 0,
};
