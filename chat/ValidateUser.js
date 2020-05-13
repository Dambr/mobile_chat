const mysql = require('mysql');
module.exports = (Login, Password, RESPONSE) => {
    let userData;
    let Rooms;
    const connection = mysql.createConnection(require('./dbConfig'));
    new Promise(function(response, reject){
        connection.query("SELECT password FROM users WHERE login =" +
        "'" + Login + "'", 
        (err, res) => {
            if (err) throw err;
            let password = res || '';
            if (password != ''){
                password = password[0]['password'];
            }
            if (password == Password) {
                connection.query("SELECT * FROM users WHERE login =" +
                "'" + Login + "'", 
                (err, res) => {
                    if (err) throw err;
                    res = res[0];
                    // delete res.password;
                    userData = res;
                    connection.query("SELECT name FROM rooms WHERE id IN " +
                    "(" +
                        "SELECT room_id FROM users_in_rooms WHERE user_id = (" +
                            "SELECT id FROM users WHERE login = " +
                            "'" + Login + "')" +
                    ")", (err, res) => {
                        if (err) throw err;
                        Rooms = [];
                        res.forEach(element => {
                            Rooms.push(element.name);
                        });
                        response();
                    });
                });
            } else {
                reject();
            }
        });
    })
    .then(
        () => {
            console.log('Пользователь прошел проверку');
            connection.end();
            RESPONSE.render('lk.ejs', {
                id: userData.id,
                name: userData.name,
                login: userData.login,
                password: userData.password,
                surname: userData.surname,
                patronymic: userData.patronymic,
                rooms: Rooms
            });
        }
    )
    .catch(
        () => {
            console.log("Пользователь НЕ прошел проверку");
            connection.end();
            RESPONSE.render('login.ejs', {message: 'Неверное имя пользователя или пароль'});
        }
    );
}