const express = require('express')
const path=require('path');
const app = express()
const port = 3000

const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(path.join(__dirname+"/static")));
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

http.listen(port, () => {
  console.log(`iChat app listening on port ${port}`)
})