const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Load SQL files
const postQuery = fs.readFileSync(path.join(__dirname, 'sql', 'post.sql'), 'utf8');
const getQuery = fs.readFileSync(path.join(__dirname, 'sql', 'get.sql'), 'utf8');

// PostgreSQL connection
const pool = new Pool({
    host: 'postgres', // service name from docker-compose
    user: 'joal',
    password: 'password123',
    database: 'TalkNest',
});

// POST /chat → Add a new message
app.post('/chat', async (req, res) => {
    try {
        const { username, message } = req.body;

        if (!username || !message) {
            return res.status(400).json({ error: 'Message and username are required' });
        }

        await pool.query(postQuery, [username, message]);
        res.status(201).json({ message: 'Message posted successfully' });
    } catch (error) {
        console.error('❌ Error posting message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /chat → Return all messages
app.get('/chat', async (_, res) => {
    try {
        const result = await pool.query(getQuery);
        res.json(result.rows); // Array of messages
    } catch (error) {
        console.error('❌ Error retrieving messages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(3000, () => {
    console.log('🚀 Server running on http://localhost:3000');
});
