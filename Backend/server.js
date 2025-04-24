const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
    host: 'postgres',
    user: 'joal',
    password: 'password123',
    database: 'chaticus',
});

app.post('/chat', async (req, res) => {
    const { message } = req.body;
    await pool.query('INSERT INTO messages (content) VALUES ($1)', [message]);
    res.sendStatus(201);
});

app.get('/chat', async (_, res) => {
    const { rows } = await pool.query('SELECT * FROM messages ORDER BY id DESC');
    res.json(rows);
});

app.listen(3000, () => console.log('Server listening on port 3000.'));
