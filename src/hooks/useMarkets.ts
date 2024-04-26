import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_VALUES, MARKETS_POLLING_URLS } from '../utils/constants';
import { ISubscribeProps, TMarketData, TMarketResponse } from '../utils/types';
import { dataNormalize } from '../utils/helpers';

export const useMarkets = () => {
  const [first, setFirst] = useState<TMarketResponse>(DEFAULT_VALUES);
  const [second, setSecond] = useState<TMarketResponse>(DEFAULT_VALUES);
  const [third, setThird] = useState<TMarketResponse>(DEFAULT_VALUES);
  const [data, setData] = useState<TMarketData>({});

  const subscribe = useCallback(async (props: ISubscribeProps) => {
    const { setState, url } = props;

    try {
      let response = await fetch(url);

      if (response.status == 502) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await subscribe(props);
      } else if (response.status != 200) {
        console.log('Error:', response.statusText);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await subscribe(props);
      } else {
        let result = await response.json();
        setState(result);
        await subscribe(props);
      }
    } catch (error) {
      console.log('Error:', error);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await subscribe(props);
    }
  }, []);

  useEffect(() => {
    subscribe({
      url: MARKETS_POLLING_URLS[0],
      setState: setFirst,
    });
    subscribe({
      url: MARKETS_POLLING_URLS[1],
      setState: setSecond,
    });
    subscribe({
      url: MARKETS_POLLING_URLS[2],
      setState: setThird,
    });
  }, []);

  useEffect(() => {
    setData(dataNormalize([first, second, third]));
  }, [first, second, third]);

  return {
    data,
  };
};
