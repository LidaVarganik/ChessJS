var board;
var geme;

window.onload = function  () {
    initGame();
};

// устанавливает мой socket-клиент
var socket = io();


var initGame = function(){
    /*Config - объект для настройки chessboarder.js */
    var cfg = {
        draggable: true,
        position: 'start',
        onDrop: handleMove,
    }; 

    board = new ChessBoard('board1', cfg);
    game = new Chess();
};

var handleMove = function(source, target){
    var move = game.move({from: source, to: target});

    if(move === null) return 'snapback';// в случае неправильного хода
     else socket.emit("move", move); // сервер примет движение и отправит клиенту

};

socket.on('move', function(msg){
       game.move(msg);
       board.position(game.fen());
});
