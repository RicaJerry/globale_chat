const express = require('express');
const bodyParser = require('body-parser');
var app = express();
var http= require('http').Server(app);
var io = require("socket.io")(http);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var messages = [
    {name: 'Test 2', message: 'msg'},
    {name: 'Test 3', message: 'msg'}
]

app.get('/messages', (req, res) => {
    res.send(messages)
})

app.post('/messages', (req, res) => {
    messages.push(req.body);
    io.emit('message', req.body);
    res.sendStatus(200);
})

io.on('connection', (socket) => {
    console.log("user connected");
})

var server = http.listen(3000, () => {
    console.log(`server on `, server.address().port);
})