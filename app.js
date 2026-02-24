const express = require('express');
const os = require('os');

const app = express();
app.use(express.json());

// 🔹 Lightweight Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    instance: os.hostname(),
    pid: process.pid,
    timestamp: new Date()
  });
});

// 🔥 CPU-Intensive Endpoint
app.get('/heavy', (req, res) => {
  const duration = parseInt(req.query.duration) || 5000; // ms
  const start = Date.now();

  console.log(`Heavy request started on PID ${process.pid}`);

  // Block CPU intentionally
  while (Date.now() - start < duration) {
    Math.sqrt(Math.random() * 1000000);
  }

  console.log(`Heavy request finished on PID ${process.pid}`);

  res.json({
    message: `CPU work done for ${duration} ms`,
    instance: os.hostname(),
    pid: process.pid
  });
});

// 🔹 Normal lightweight endpoint
app.get('/', (req, res) => {
  res.json({
    message: "Hello from Node app",
    instance: os.hostname(),
    pid: process.pid
  });
});

app.listen(3000, '0.0.0.0', () => {
  console.log('App running on port 3000');
});
