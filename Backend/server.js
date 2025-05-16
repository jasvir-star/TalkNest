const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Load SQL queries from files
const postQuery = fs.readFileSync(path.join(__dirname, 'sql', 'post.sql'), 'utf8');
const getQuery = fs.readFileSync(path.join(__dirname, 'sql', 'get.sql'), 'utf8');

// Database connection setup
const pool = new Pool({
    host: 'postgres', // Docker container name for PostgreSQL
    user: 'joal',     // Database username
    password: 'password123', // Database password
    database: 'TalkNest', // Database name
});

// Post route to add messages to the database
app.post('/chat', async (req, res) => {
    try {
        const { username, message } = req.body;  // Expecting message and username
        
        // Ensure both message and username are provided
        if (!username || !message) {
            return res.status(400).send('Message and username are required');
        }

        // Insert message into the database
        await pool.query(postQuery, [username, message]);
        res.status(201).send('Message posted successfully');
    } catch (error) {
        console.error('Error posting message:', error);
        res.status(500).send('Server error');
    }
});

// Get route to retrieve all chat messages
app.get('/chat', async (_, res) => {
    try {
        // Retrieve messages from the database
        const { rows } = await pool.query(getQuery);
        res.json(rows);  // Return messages as JSON
    } catch (error) {
        console.error('Error retrieving messages:', error);
        res.status(500).send('Server error');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000.');
});