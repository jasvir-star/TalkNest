const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

const postQuery = fs.readFileSync(path.join(__dirname, 'sql', 'post.sql'), 'utf8');
const getQuery = fs.readFileSync(path.join(__dirname, 'sql', 'get.sql'), 'utf8');

// These should probably be in a .config file that isn't versioned
const pool = new Pool({
    host: 'postgres',
    user: 'joal',
    password: 'password123',
    database: 'chaticus',
});

app.post('/chat', async (req, res) => {
    const { message } = req.body;
    await pool.query(postQuery, [message]);
    res.sendStatus(201);
});

app.get('/chat', async (_, res) => {
    const { rows } = await pool.query(getQuery);
    res.json(rows);
});

app.listen(3000, () => console.log('Server listening on port 3000.'));
