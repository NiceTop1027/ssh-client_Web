const express = require('express');
const http = require('http');
// const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:3001',
//     methods: ['GET', 'POST'],
//   },
// });

const authRoutes = require('./routes/auth');

const keysRoutes = require('./routes/keys');


const connectionsRouter = require('./routes/connections'); // NEW: Import connections router

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/keys', keysRoutes);
app.use('/api/connections', connectionsRouter);

app.get('/test', (req, res) => res.send('Test route works!'));

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

// const { SSHConnection } = require('./lib/ssh');

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   new SSHConnection(socket);
// });

// const PORT = process.env.PORT || 4000;

// server.listen(PORT, () => {
//   console.log(`listening on *:${PORT}`);
// });

module.exports = app;
