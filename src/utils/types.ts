export enum ECurrensies {
  RUB = 'RUB',
  USD = 'USD',
  EUR = 'EUR',
}

export type TMarketResponse = {
  rates: Record<keyof typeof ECurrensies, number>;
  timestamp: number;
  base: string;
  date: string;
};

export type TMarketData = Record<string, number[]>;

export interface ISubscribeProps {
  url: string;
  setState: (value: TMarketResponse) => void;
}
