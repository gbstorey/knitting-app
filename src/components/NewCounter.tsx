import './NewCounter.css';
import { useState, FormEvent } from 'react';

interface NewCounterProps {
    onAddCounter: (name: string, target: number) => void;
}

function NewCounter({ onAddCounter }: NewCounterProps) {
    const [counterName, setCounterName] = useState('');
    const [targetNumber, setTargetNumber] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        // Validate inputs
        if (counterName.trim() === '' || !targetNumber) {
            return;
        }

        // Convert target to number and validate
        const targetValue = parseInt(targetNumber);
        if (isNaN(targetValue) || targetValue <= 0) {
            return;
        }

        // Pass data to parent component
        onAddCounter(counterName, targetValue);

        // Reset form
        setCounterName('');
        setTargetNumber('');
    };

    return (
        <div className="blank-container">
            <form onSubmit={handleSubmit} className="counter-form">
                <input
                    type="text"
                    value={counterName}
                    onChange={(e) => setCounterName(e.target.value)}
                    placeholder="Counter Name"
                    className="counter-input"
                />
                <input
                    type="number"
                    value={targetNumber}
                    onChange={(e) => setTargetNumber(e.target.value)}
                    placeholder="Target Number"
                    min="1"
                    className="counter-input"
                />
                <button type="submit" className="submit-button">
                    Add Counter
                </button>
            </form>
        </div>
    );
}

export default NewCounter;
