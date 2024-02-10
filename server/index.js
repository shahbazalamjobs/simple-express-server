// Import necessary libraries
import express from 'express';
import pg from 'pg';

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create an instance of Express
const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL configuration
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

const users = [
    { name: "John", age: 30 },
    { name: "Alice", age: 25 },
    { name: "Bob", age: 35 }
];


app.get('/', (req, res) => {
    res.send("Root endpoint Running");
})

app.get('/api/obj', (req, res) => {
    res.send(users);
})
// Define a route to retrieve data from PostgreSQL
app.get('/data', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM your_table_name');
        const data = result.rows;
        client.release();
        res.json(data);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
