// index.js
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.get('/', (req, res) => {
    res.send('Hello from Node + Express! 🚀\nIf you see this, nginx → node works.');
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
