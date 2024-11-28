import './Counter.css'
import { useState } from 'react';

interface CounterProps {
  name: string;
  targetNumber: number;
  onGlobalDecrement: () => void;
  onGlobalIncrement: () => void;
}

const Counter: React.FC<CounterProps> = ({ name, targetNumber, onGlobalDecrement, onGlobalIncrement }) => {
  const [count, setCount] = useState(0);
  const [totalRows, setTotalRows] = useState(0);

  const handleIncrement = () => {
    const newCount = count + 1;
    if (newCount === targetNumber) {
      setCount(0);
      setTotalRows(prev => prev + 1);
    } else {
      setCount(newCount);
    }
    onGlobalIncrement();
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    } else if (count === 0) {
      setTotalRows(prev => Math.max(0, prev - 1));
    }
    onGlobalDecrement();
  };

  return (
    <div className="counter-container">
        <div className="counter-name">
          {name}
        </div>
        <div className="counter-controls">
          <button onClick={handleDecrement}>
            <img src="pusheen-minus.png" alt="Decrease" className="pusheen"/>
          </button>
          <span>{count}</span>
          <button onClick={handleIncrement}>
            <img src="pusheen-plus.png" alt="Increase" className="pusheen"/>
          </button>
          <div className="total-rows">
          Total Rows: {totalRows}
          </div>
        </div>
    </div>
  );
};

export default Counter;
