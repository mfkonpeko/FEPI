// conexion.cjs
let mysql = require("mysql2");

let conexion = mysql.createConnection({
    host: "localhost",
    database: "esconectados",
    user: "root",
    password: "000102"
});

conexion.connect(function(err){
    if(err){
        console.error("Error en la conexión: ", err);
        return;
    }else{
        console.log("Conexión exitosa");
    }
});

// Exportar la conexión para su uso en otro lugar
module.exports = conexion;