var express = require('express');
var app = express();
app.use(express.static('public'));

var http = require('http').Server(app);
var port = process.env.PORT || 5000;

var io = require('socket.io')(http);// подключаем socket.io серверную часть, присоединяем к http клиенту для http-сервера

io.on('connection', function(socket){
    console.log('new connection');

    socket.on('move', function(msg){
        socket.broadcast.emit('move', msg);
    });
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/default.html');

});

http.listen(port, function(){
    console.log('listening on *:' + port);
});



