import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'
import cors from 'cors'

const app = express()
app.use(cors())

const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  socket.emit('me', socket.id)

  socket.on('disconnect', () => {
    socket.broadcast.emit('callEnded')
  })

  socket.on('callUser', ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit('callUser', { signal: signalData, from, name })
  })

  socket.on('answerCall', ({ to, signal }) => {
    io.to(to).emit('callAccepted', signal)
  })
})

const PORT = process.env.PORT || 5001
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))