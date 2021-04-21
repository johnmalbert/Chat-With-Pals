const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const server = app.listen(8000, () => console.log("Server is up and running on port 8000"));

const io = require('socket.io')(server, { cors: true })//enable to accept cross origin resources.

io.on('connection', socket => {
    socket.on('sendMessage', data => {
        socket.broadcast.emit('messageSent', data);
    })
    socket.on('clientTyping', data => {
        socket.broadcast.emit('clientTyping', data);
    })
})
require('./config/mongoose.config');