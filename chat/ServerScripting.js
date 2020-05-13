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

// // Login - логин пользователя - строка  // Используем, потому что он уникальный
// GetUserData = require('./GetUserData');

// // Login - логин пользователя - строка
// GetListOfRooms = require('./GetListOfRooms');



// const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = require('express')();
const http = require('http').Server(app);
const urlencodedParser = bodyParser.urlencoded({extended : false});
const server = {host : '127.0.0.1', port : 4000};


app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(bodyParser.json())

var io = require('socket.io')(http);

app.get('/', function(req, res){
    // res.sendFile(__dirname + '/index.html');
    res.render('login.ejs', {message : ''});
});
app.post('/createNewRoom', urlencodedParser, function(req, res){
    // console.log(req);
    // console.log('Получен запрос на создание новой комнаты');
    // console.log("name", req.body.name);
    // console.log("id_admin",req.body.id_admin);
    CreateNewRoom(req.body.name, req.body.id_admin, res);
});
app.post('/validateUser', urlencodedParser, function(req, res){
    ValidateUser(req.body.login, req.body.password, res);
});
app.post('/room', urlencodedParser, function(req, res){
    ShowRoom(req.body.name, req.body.login, res);
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
});

http.listen(server.port, server.host, ()=>{
	console.log(server);
});