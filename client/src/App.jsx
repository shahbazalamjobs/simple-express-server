// src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://simple-express-server-postgres.onrender.com/data');
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Data List</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
