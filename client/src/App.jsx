// src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://simple-express-server-postgres.onrender.com/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
  }, []);

  return (
    <div>
      <h2>Data List</h2>
      <ul>
        {Array.isArray(data) && data.map((item, index) => (
          <li key={index}>{item.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
