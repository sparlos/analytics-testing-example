import './App.css';
import { useState } from 'react';
import { makeAnalyticsCall } from './services/analytics';

function App() {
  const [clickAmount, setClickAmount] = useState(0);

  const handleSetClickAmount = () => {
    const newAmount = clickAmount + 1;
    makeAnalyticsCall('increment_button_clicked', {
      click_amount: newAmount,
    });
    setClickAmount(newAmount);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          current amount: <span data-testid="click-amount">{clickAmount}</span>
        </p>
        <button onClick={handleSetClickAmount}>Click to increment!</button>
      </header>
    </div>
  );
}

export default App;
