const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const PORT = process.env.PORT || 3000

io.on('connection', (socket) => {
  console.log('Usuário %s conectou-se no servidor.', socket.id)

  socket.on('disconnect', () => {
    console.log('Usuário %s desconectou-se do servidor.', socket.id)
  })
})

app.use(express.static('../cliente/'))
server.listen(PORT, () =>
  console.log(`Servidor em execução na porta ${PORT}!`)
)
