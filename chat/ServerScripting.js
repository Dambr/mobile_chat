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
ValidateUser = require('./ValidateUser');

// Login - логин пользователя - строка  // Используем, потому что он уникальный
GetUserData = require('./GetUserData');

// Login - логин пользователя - строка
GetListOfRooms = require('./GetListOfRooms');

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const urlencodedParser = bodyParser.urlencoded({extended : false});
const server = {host : '127.0.0.1', port : 4000};

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

var io = require('socket.io')(http);

app.get('/', function(req, res){
    // res.sendFile(__dirname + '/index.html');
    res.render('login.ejs', {message : ''});
});
app.post('/validateUser', urlencodedParser, function(req, res){
    // Если логин и пароль с теми, что в базе совпадают
    console.log(ValidateUser(req.body.login, req.body.password));
    // if (ValidateUser(req.body.login, req.body.password)) {
    //     console.log("All correct");
    //     userData = GetUserData(req.body.login);
    //     rooms = GetListOfRooms(req.body.login);
        
    //     res.render('lk.ejs', {
    //         id: userData.id,
    //         name: userData.name,
    //         login: userData.login,
    //         surname: userData.surname,
    //         patronymic: userData.patronymic,
    //         rooms
    //     });
    // } else {
    //     res.render('login.ejs', {message: 'Неверное имя пользователя или пароль'});
    // }
});

app.get('/chat', function(req, res){
    // res.sendFile(__dirname + '/index.html');
    res.sendFile(__dirname + '/test.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});

app.listen(server.port, server.host, ()=>{
	console.log(server);
});