function AddUserToDataBase(Login, Password, UserName){

}

function CreateTablesRoom(RoomName){

}

function ConnectToDatabase(mysql, login, password, host){
  var con = mysql.createConnection(require('./dbConfig'));
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to Mysql DataBase hosted on " + host + " with login " + login + " and password " + password);
  });
}

function checkChatRoom(name, dbConnection, tableName){
  var resulted;
  db.query("SELECT * FROM " + tableName + "WHERE RName = " + name + ";", function (err, result, fields) {
    if (err) {
      resulted = 'none'
    }else{
      resulted = result
    }
  });
  return resulted;
}