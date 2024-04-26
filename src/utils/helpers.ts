import { ECurrensies, TMarketData, TMarketResponse } from './types';

export const dataNormalize = (data: TMarketResponse[]): TMarketData => {
  let result: TMarketData = {};

  data.forEach((res) => {
    Object.keys(res.rates).forEach((currency) => {
      const ticker = `${currency}/${res.base}`;
      if (!result[ticker]) {
        result[ticker] = [];
      }
      result[ticker].push(res.rates[currency as keyof typeof ECurrensies]);
    });
  });

  return result;
};
