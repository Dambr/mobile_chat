const mysql = require('mysql');

UserId = 2;
RoomName = 'New_Room_1';

const connection = mysql.createConnection(require('./dbConfig'));
new Promise(function(response, reject){
    let room_id = RoomName.split('_');
    room_id = room_id[room_id.length - 1];
    connection.query("DELETE FROM users_in_rooms WHERE " +
        "room_id = " + room_id + 
        " AND " + 
        "user_id = " + UserId,
        (err, res) => {
            if (err) throw err;
            response();
        }
    );
})
.then(
    () => {
        console.log('Пользователь из комнаты удален');
        connection.end();
    }
);

// CreateNewRoom = require('../CreateNewRoom');
// CreateNewRoom('New_Room', 1);

// DeleteRoom = require('../DeleteRoom');
// DeleteRoom('New_Room_1');

// AddUserToRoom = require('../AddUserToRoom');
// AddUserToRoom(2, 'New_Room_1');

// DeleteUserFromRoom = require('../DeleteUserFromRoom');
// DeleteUserFromRoom(2, 'New_Room_1')