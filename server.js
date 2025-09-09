const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Define a porta do servidor
const PORT = process.env.PORT || 3000;

// Serve o arquivo index.html na raiz do servidor
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Quando um cliente se conecta...
io.on('connection', (socket) => {
  console.log('Um novo usuário se conectou!');

  // Recebe uma mensagem do cliente
  socket.on('chat message', (msg) => {
    console.log('mensagem recebida: ' + msg);

    // Envia a mensagem para TODOS os clientes conectados
    io.emit('chat message', msg);
  });

  // Quando um cliente se desconecta...
  socket.on('disconnect', () => {
    console.log('Usuário desconectado.');
  });
});

// Inicia o servidor
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});