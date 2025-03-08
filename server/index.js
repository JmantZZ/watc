const express = require("express");
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

app.use(cors())
const server = http.createServer(app)
const io = new Server(server, {
cors:{
    origin:"http://79.76.113.107:3000",
    methods: ["GET", "POST"]
}})

io.on("connection", (socket)=> {
    console.log(`user connected: ${socket.id}'`)

    socket.on("play_state",(data) =>{
        console.log(data)
        socket.broadcast.emit("change_state", data)
    })

})

server.listen(3001, ()=>{
    console.log('server is running')
})