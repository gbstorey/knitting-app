import './Counter.css'
import { useState } from 'react';

interface CounterProps {
  name: string;
  targetNumber: number;
  onGlobalIncrement: () => void;
  onGlobalDecrement: () => void;
  onCounterUpdate: (newCount: number, newTotalRows: number) => void;
  initialCount?: number;
  initialTotalRows?: number;
}
const Counter: React.FC<CounterProps> = ({ 
  name, 
  targetNumber, 
  onGlobalDecrement, 
  onGlobalIncrement,
  onCounterUpdate,
  initialCount = 0,
  initialTotalRows = 0
}) => {
  const [count, setCount] = useState(initialCount);
  const [totalRows, setTotalRows] = useState(initialTotalRows);

  const handleIncrement = () => {
    const newCount = count + 1;
    if (newCount === targetNumber) {
      setCount(0);
      const newTotalRows = totalRows + 1;
      setTotalRows(newTotalRows);
      onCounterUpdate(0, newTotalRows);
    } else {
      setCount(newCount);
      onCounterUpdate(newCount, totalRows);
    }
    onGlobalIncrement();
  };

  const handleDecrement = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
      onCounterUpdate(newCount, totalRows);
    } else if (count === 0 && totalRows > 0) {
      const newTotalRows = totalRows - 1;
      setTotalRows(newTotalRows);
      onCounterUpdate(count, newTotalRows);
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
