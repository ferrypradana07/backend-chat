const express = require('express')
const socketIo = require('socket.io')
const cors = require('cors')
const bodyParser = require('body-parser')
const http = require('http')
const path = require('path')
const { existsSync } = require('fs')
const app = express()

const server = http.createServer(app)

app.use(cors({
  origin : '*',
  methods : ['GET', 'POST'],
  allowedHeaders : ['Content-Type']
}))


const IO = socketIo(server, {
  cors : {
    origin : '*',
    methods : ['GET', 'POST'],
    allowedHeaders : ['Content-Type']
  }
})

app.get('/:namePic', (req,res) => {
  const namePic = req.params.namePic
  if (namePic.includes('/')) {
    return res.sendStatus(400)
  }
  const pathFile = path.join(__dirname, 'upload', namePic)
  if (existsSync(pathFile)) {
    res.sendFile(pathFile)
  } else {
    res.sendStatus(404)
  }
})

// Daftar
// Masuk
// Keluar
// ListChannel
// Channel 
// Send dan receive
// Send Date


app.get('/', (req,res) => {
  const index = path.join(__dirname, 'public', 'index.html')
  res.sendFile(index)
})

app.use((req, res, next) => {
  res.json("Page not found")
})

IO.on('connection', (socket) => {
  console.log(' client is connect')

  socket.on('send_message', (message) => {
    IO.emit('send_message', message)
  })

  socket.on('disconnect' , () => {
    console.log('client is disconnect')
  })
})

const PORT = process.env.NODE_PORT || 7575
server.listen(PORT, () => {
  console.log(`server is running on port = ${PORT}`)
})