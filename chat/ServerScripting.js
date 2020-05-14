// RoomName - название комнаты - строка
// id_admin - id создателя комнаты - число
CreateNewRoom = require('./CreateNewRoom'); 

// RoomName - название комнаты (_id) - строка
DeleteRoom = require('./DeleteRoom');

// UserId - Id юзера, которого добавляем - число
// RoomName - Полное название комнаты (_id)
AddUserToRoom = require('./AddUserToRoom');

// Login - логин, котороый указал юзер - строка
// Password - пароль, который указал юзер - строка
// RESPONSE - ссылка на объект, который надо отправить пользователю
ValidateUser = require('./ValidateUser');

// RoomName - название комнаты
// RESPONSE - ссылка на объект, который надо отправить пользователю
ShowRoom = require('./ShowRoom');

// RoomName - название комнаты, в которой появилось новое сообщение
// Message - Текст сообщение
// Author - автор сообщения
AddMessageToDataBase = require('./AddMessageToDataBase');

// RoomName - название комнаты
// Id_Admin - id админа
// RESPONSE - ссылка на объект, который надо отправить пользователю
CheckHostOfRomm = require('./CheckHostOfRoom');

// RoomName - название комнаты
// Id_User - id пользователя, которого надо добавить в комнату
// RESPONSE - ссылка на объект, который надо отправить пользователю
AddUserById = require('./AddUserById');


// RoomName - название комнаты
// RESPONSE - ссылка на объект, который надо отправить пользователю
DeleteCurrentRoom = require('./DeleteCurrentRoom');

// UserId
// RoomName
// RESPONSE
DeleteUserFromRoomById = require('./DeleteUserFromRoomById');
// // Login - логин пользователя - строка  // Используем, потому что он уникальный
// GetUserData = require('./GetUserData');

// // Login - логин пользователя - строка
// GetListOfRooms = require('./GetListOfRooms');



const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = require('express')();
const http = require('http').Server(app);
const urlencodedParser = bodyParser.urlencoded({extended: false});
var io = require('socket.io')(http);
const server = {host : '127.0.0.1', port : 4000};


app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(bodyParser.json())



app.get('/', function(req, res){
    // res.sendFile(__dirname + '/index.html');
    res.render('login.ejs', {message : ''});
});
app.post('/createNewRoom', urlencodedParser, function(req, res){
    // console.log(req.body);
    CreateNewRoom(req.body.name, req.body.id_admin, res);
});
app.post('/checkHostOfRoom', urlencodedParser, function(req, res){
    CheckHostOfRomm(req.body.room_name, req.body.id_admin, res);
});
app.post('/addUserById', urlencodedParser, function(req, res){
    AddUserById(req.body.room_name, req.body.id_user, res);
});
app.post('/deleteUserFromRoomById', urlencodedParser, function(req, res){
    DeleteUserFromRoomById(req.body.user_id, req.body.room_name, res);
});
app.post('/deleteCurrentRoom', urlencodedParser, function(req, res){
    DeleteCurrentRoom(req.body.room_name, res);
});
app.post('/validateUser', urlencodedParser, function(req, res){
    ValidateUser(req.body.login, req.body.password, res);
});
app.post('/room', urlencodedParser, function(req, res){
    ShowRoom(req.body.roomName, req.body.userData, res);
});


io.on('connection', function(socket){
    console.log('a user connected');
    socket.room = '';
    socket.on('join', msg => {
        socket.join(msg.room);
    });
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('chat message', function(msg){
        AddMessageToDataBase(msg.room, msg.message, msg.author);
        io.to(msg.room).emit('chat message', {message: msg.message});
    });
    socket.on('delete user id', function(msg){
        io.to(msg.room).emit('delete user id', {id: msg.id});
    });
    socket.on('delete room', function(msg){
        io.to(msg.room).emit('delete room', {message: "КОМНАТА УДАЛЕНА"});
        io.of('/').in(msg.room).clients((error, socketIds) => {
            if (error) throw error;
            socketIds.forEach(socketId => io.sockets.sockets[socketId].leave(msg.room));
        });
    });
});

http.listen(server.port, server.host, ()=>{
	console.log(server);
});