import './App.css';
import { useState } from 'react';
import ReactGA from 'react-ga4';

function App() {
  const [clickAmount, setClickAmount] = useState(0);

  const handleSetClickAmount = () => {
    const newAmount = clickAmount + 1;
    ReactGA.event('increment_button_clicked', {
      click_amount: newAmount,
    });
    setClickAmount(newAmount);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>current amount: {clickAmount}</p>
        <button onClick={handleSetClickAmount}>Click to increment!</button>
      </header>
    </div>
  );
}

export default App;
