const express = require('express');
const path=require('path')
const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const port=3000
const io = new Server(server, { cors: { origin: '*' } });




app.use(express.static(path.join(__dirname+"/static")));
app.get('/socket.io/socket.io.js', (req, res) => {
  res.sendFile(__dirname + '/node_modules/socket.io/client-dist/socket.io.js');
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

let usersObj={};

io.on("connection",socket=>{
    socket.on("new-user-joined",name=>{
        usersObj[socket.id]=name;
        socket.broadcast.emit("user-joined",name,"has joined the conversation");
    });
    socket.on("send",(msg)=>{
        socket.broadcast.emit("receive",usersObj[socket.id],msg);
    })
    socket.on("disconnect",()=>{
      socket.broadcast.emit("exit",usersObj[socket.id],"has left the coversation");
      delete usersObj[socket.id];
    })
})

server.listen(port, () => {
  console.log(`iChat app listening on port ${port}`)
})