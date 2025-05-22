// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static
app.use(express.static(path.join(__dirname)));

// Songs API
app.get('/songs', (req, res) => {
  fs.readdir(path.join(__dirname, 'songs'), (err, files) => {
    if (err) return res.json([]);
    res.json(files.filter(f => /\.(mp3|m4a)$/i.test(f)));
  });
});

// Fallback
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'index.html'))
);

app.listen(PORT, () => console.log(`Server @ http://localhost:${PORT}`));
