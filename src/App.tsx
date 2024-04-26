import { Fragment } from 'react/jsx-runtime';
import './App.css';
import { useMarkets } from './hooks/useMarkets';

export const App: React.FC = () => {
  const { data } = useMarkets();
  
  return (
    <div className='container'>
      <div>Pair name/market</div>
      <div>First</div>
      <div>Second</div>
      <div>Third</div>
      {Object.keys(data).map((ticker) => {
        const lowestPriceIndex = data[ticker].indexOf(Math.min(...data[ticker]))
        return (
          <Fragment key={ticker}>
            <div>{ticker}</div>
            {data[ticker].map((item, index) => (
              <div key={`${ticker}.${index}`} className={`${index === lowestPriceIndex ? 'lowest' : ''}`}>{item.toFixed(2)}</div>
            ))}
          </Fragment>
        );
      })}
    </div>
  );
};
