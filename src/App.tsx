import './App.css'
import { useState, useEffect } from 'react'
import Counter from './components/Counter'
import NewCounter from './components/NewCounter';
import SettingsMenu from './components/DropdownMenu';

interface CounterData {
  id: number;
  name: string;
  targetNumber: number;
  currentCount: number;
  totalRows: number;
}

interface SaveData {
  globalCounter: number;
  counters: CounterData[];
}

const endpoint = "https://sdoz0lvnrf.execute-api.us-east-2.amazonaws.com/default/knitting-app-lambda/hannah.json"

function App() {
  const [globalCounter, setGlobalCounter] = useState(0);
  const [counters, setCounters] = useState<CounterData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to save all data
const saveData = async (data: SaveData) => {
  console.log("Saving data:", data) // Helpful for debugging
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: "hannah.json",
        content: data
      })
    });

    if (!response.ok) {
      throw new Error('Failed to save data');
    }
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Failed to save changes');
    console.error('Error saving data:', err);
  }
};

const handleClearCounters = async () => {
  // Reset all states to initial values
  setGlobalCounter(0);
  setCounters([]);
  
  // Save the empty state
  try {
    await saveData({ 
      globalCounter: 0, 
      counters: [] 
    });
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Failed to clear counters');
    console.error('Error clearing counters:', err);
  }
};

  function handleClickDecreaseGlobal() {
    if (globalCounter === 0) return;
    setGlobalCounter(prevCount => prevCount - 1);
  }

  function handleClickIncreaseGlobal() {
    setGlobalCounter(prevCount => prevCount + 1);
  }

  function handleAddCounter(name: string, target: number) {
    const newCounter: CounterData = {
      id: Date.now(),
      name: name,
      targetNumber: target,
      currentCount: 1,
      totalRows: 0
    };
    
    setCounters(prevCounters => [...prevCounters, newCounter]);
  }

  const handleCounterUpdate = (counterId: number, newCount: number, newTotalRows: number) => {
    setCounters(prevCounters => 
      prevCounters.map(counter => 
        counter.id === counterId 
          ? { ...counter, currentCount: newCount, totalRows: newTotalRows }
          : counter
      )
    );
  };

  // Initial data fetch
useEffect(() => {
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const responseData = await response.json();
      // Extract data from the response content
      const data = JSON.parse(responseData.data) || { globalCounter: 0, counters: [] };
      console.log("Fetched data:", responseData)
      setGlobalCounter(data.globalCounter || 0);
      setCounters(data.counters || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  };
  fetchData();
}, []);


  // Debounced save with pending updates tracking
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveData({ globalCounter, counters });
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [globalCounter, counters]);

  // Debounced save
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveData({ globalCounter, counters });
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [globalCounter, counters]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <SettingsMenu onClearCounters={handleClearCounters} />
      <h1>I LOVE HANNAH HANNAH IS AMAZING AND CUTE AND FUN</h1>
      <div className='global-counter xl-font xl-gap bg-pink'>
        <div className="counter-controls">
          <button onClick={handleClickDecreaseGlobal}>
            <img src="pusheen-minus.png" alt="Photo of pusheen holding minus button" className='pusheen'/>
          </button>
          <span>{globalCounter}</span>
          <button onClick={handleClickIncreaseGlobal}>
            <img src="pusheen-plus.png" alt="Photo of pusheen holding plus button" className='pusheen'/>
          </button>
        </div>
      </div>
      <div className='counter-flex flex-wrap'>
        {counters && counters.map(counter => (
          <Counter
            key={counter.id}
            name={counter.name}
            targetNumber={counter.targetNumber}
            onGlobalIncrement={handleClickIncreaseGlobal}
            onGlobalDecrement={handleClickDecreaseGlobal}
            onCounterUpdate={(newCount, newTotalRows) => 
              handleCounterUpdate(counter.id, newCount, newTotalRows)}
            initialCount={counter.currentCount}
            initialTotalRows={counter.totalRows}
          />
        ))}
        <NewCounter onAddCounter={handleAddCounter}/>
      </div>
    </>
  );
}

export default App;
