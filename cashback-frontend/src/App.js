import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [message, setMessage] = useState('');


  const handleTransaction = async () => {
    try {
      const response = await axios.post('http://localhost:5000/transaction', {
        userId,
        amount: parseFloat(amount),
        currency,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response ? error.response.data.error : 'An error occurred');
    }
  };

  return (
    <div className="App">
      <h1>Crypto Cashback Platform</h1>

      <div>
        <label>User ID:</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>

      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div>
        <label>Currency:</label>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </div>

      <button onClick={handleTransaction}>Process Transaction</button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
