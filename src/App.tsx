import './App.css'
import { useState } from 'react'
import Counter from './components/Counter'
import NewCounter from './components/NewCounter';

interface CounterData {
  id: number;
  name: string;
  targetNumber: number;
}


function App() {
  const [globalCounter, setGlobalCounter] = useState(0);
  const [counters, setCounters] = useState<CounterData[]>([]);
  function handleClickDecreaseGlobal () {
    if (globalCounter === 0) return
    setGlobalCounter(globalCounter - 1)
  }
  function handleClickIncreaseGlobal () {
    setGlobalCounter(globalCounter + 1)
  }
  function handleAddCounter (name: string, target: number) {
    const newCounter: CounterData = {
        id: Date.now(), // Simple way to generate unique IDs
        name: name,
        targetNumber: target
    };
    
    setCounters(prevCounters => [...prevCounters, newCounter]);
};
  return (
    <>
      <h1>I LOVE HANNAH HANNAH IS AMAZING AND CUTE AND FUN</h1>
      <div className='global-counter xl-font xl-gap bg-pink'>
      <div className="counter-controls">
        <button onClick={handleClickDecreaseGlobal}>
          <img src="pusheen-minus.png" alt="Photo of pusheen holding minus button" className='pusheen'/>
        </button>
        <span>{globalCounter}</span>
        <button onClick={handleClickIncreaseGlobal}>
        <img src="pusheen-plus.png" alt="Photo of pusheen holding minus button" className='pusheen'/>
        </button>
      </div>
      </div>
      <div className='counter-flex flex-wrap'>
      {counters.map(counter => (
                    <Counter
                        key={counter.id}
                        name={counter.name}
                        targetNumber={counter.targetNumber}
                        onGlobalIncrement={handleClickIncreaseGlobal}
                        onGlobalDecrement={handleClickDecreaseGlobal}
                    />
                ))}
      <NewCounter onAddCounter={handleAddCounter}/>
      </div>
    </>
  )
}

export default App
