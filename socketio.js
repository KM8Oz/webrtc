const { v4: uuidV4 } = require('uuid')
const colors = require('colors')
const fs = require('fs')
exports.init = (server)=>{
const io = require('socket.io')(server)
io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
      socket.join(roomId)
      socket.to(roomId).broadcast.emit('user-connected', userId)
      //==--  blobs to stream  --==//
      //==--  blobs to stream  --==//
      socket.on('disconnect', () => {
        socket.to(roomId).broadcast.emit('user-disconnected', userId)
      })
    })
  })
}