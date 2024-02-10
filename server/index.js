// Import necessary libraries
import express from 'express';
import pg from 'pg';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

// Create an instance of Express
const app = express();
const port = process.env.PORT || 4000;

// PostgreSQL configuration
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json());

const users = [
    { name: "John", age: 30 },
    { name: "Alice", age: 25 },
    { name: "Bob", age: 35 }
];

app.get('/', (req, res) => {
    res.send("Root endpoint Running");
});

// Define a route to retrieve static data
app.get('/api/obj', (req, res) => {
    res.json(users);
});

// Define a route to retrieve data from PostgreSQL
app.get('/data', async (req, res, next) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM messageTable');
        const data = result.rows;
        client.release();
        res.json(data);
    } catch (err) {
        console.error('Error executing query', err);
        next(err); // Pass error to the error handling middleware
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
