// таблица конат (id комнаты, название комнаты)

// на каждую комнату таблица с описанием комнаты id комнаты в названии 
// (id сообщения, текст сообщения, никнейм автора, дата-время сообщения)

// таблица user-ов (id, логин, пароль, имя, фамилия, отчество)

function ResendLastMessages(Number, RoomName){
    
}

function SendMessageToUser(UserName, MessageBody){

}
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