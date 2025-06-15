
const express = require("express");
const bodyParser = require('body-parser')
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const mariadb = require('mariadb');
const session = require("express-session");
const { randomUUID } = require("crypto");
const fs = require('fs')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())

const server = http.createServer(app)
const io = new Server(server,{
cors:{
    origin:"http://79.76.113.107:3000",
    methods: ["GET", "POST"]
}})



var pool =
  mariadb.createPool({
    host: "localhost",
    port: 3306,
    user: "server",
    password: "serverpassword123321",
    database: "users"
  });




// console.log(await pool.query("select * from users"))

app.post('/videolist', (req, res) => {
      async function grau(query){
        const results = await pool.query(query)
        let files = []
        await fs.readdir('../client/public/videos', (err, data) => {
              if(results[0] != undefined){
                res.send(data)
              } else{
                res.send('fail')
              }
        })
      }

    grau(`select * from token_key where id like '${req.body.auth}'`)
})


app.post('/validate', (req, res) => {
    //console.log(req.body)
    async function dbquery(query){
        const results = await pool.query(query)
        if(results[0] != undefined){
          if (req.get('auth') == undefined) {
            const token = await pool.query('select * from token_key')
              res.send(token)
          }
        } else {
            res.send('fail')
      }
    }
    
    dbquery(`select * from users where username like '${req.body.username}' and password like '${req.body.password}' and id like '${req.body.user_id}'`)
  })

app.post('/authorize', (req, res) => {
    //console.log(req.body)
    async function authorize(query){
        const results = await pool.query(query)
        if(results[0] != undefined){
            res.send('success')
          } else {
            res.send('fail')
      }
    }
    
    authorize(`select * from token_key where id like '${req.body.auth}'`)
  })

  app.post('/admin_authorize', (req, res) => {
    //console.log(req.body)
    async function authorize(query){
        const results = await pool.query(query)
        if(results[0] != undefined){
            if(req.body.id == '30141607'){
              res.send('success')
            } else{res.send('fail')}
          } else {
            res.send('fail')
      }
    }
    
    authorize(`select * from token_key where id like '${req.body.auth}'`)
  })

  app.get('/cookiecheck', (req,res) =>{
    console.log(req.session.user)
    res.send('meow')
  })

io.on("connection", (socket)=> {
    console.log(`user connected: ${socket.id}'`)
    socket.on('room_id', (data) =>{
      socket.join(data)
      console.log("user with id: "+socket.id+"has connected to room with id:"+ data)
    })

    socket.on('play_video', (data) =>{
      console.log('played')
      console.log(data + data[0]+ data[1])
      socket.to(data[0]).emit("event_video_play", data[1]);
    })

    socket.on('pause_video', (data) =>{
      console.log("paused")
            console.log(data + data[0]+ data[1])

      socket.to(data[0]).emit("event_video_pause", data[1]);
    })

})

server.listen(3001, ()=>{
    console.log('server is running')
})