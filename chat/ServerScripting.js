// RoomName - название комнаты - строка
// id_admin - id создателя комнаты - число
CreateNewRoom = require('./CreateNewRoom'); 

// RoomName - название комнаты (_id) - строка
DeleteRoom = require('./DeleteRoom');

// UserId - Id юзера, которого добавляем - число
// RoomName - Полное название комнаты (_id)
AddUserToRoom = require('./AddUserToRoom');

// UserId - Id юзера, которого удаляем - число
// RoomName - Полное название комнаты (_id)
DeleteUserFromRoom = require('./DeleteUserFromRoom');


const ws = new require('ws');
const wss = new ws.Server({port: 8080});

const clients = new Set();
const http = require("http");

var mysql = require('mysql');
var nameOfListOfRoom = "ROOMS"



http.createServer((req, res) => {
  // в реальном проекте здесь может также быть код для обработки отличных от websoсket-запросов
  if (req.url == "/" && req.method == "post"){
    response.write("Its working");
  }
  
  
  // здесь мы работаем с каждым запросом как с веб-сокетом
  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
});

function onSocketConnect(ws) {
  clients.add(ws);

  ws.on('message', function(message) {
    message = message.slice(0, 5000); // максимальный размер сообщения 50
    if (message[0] == '`'){
        check = checkChatRoom(message.slice(1),con,nameOfListOfRoom);
        if (check != 'none'){
          client.send('`' + check[0]['RName']);
        }
    }else{
      listMessages.push(message);
      for(let client of clients) {
        client.send("clearChat");
        for(let me of listMessages) {
          client.send(me);
        }
      }
    }
	  

  ws.on('close', function() {
    clients.delete(ws);
  });
});
}