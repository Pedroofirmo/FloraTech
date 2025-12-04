import mysql from "mysql2"

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "floratech"
});

conn.connect((erro) => {
    if (erro) {
        console.log("problema com bd");
    } else {
    console.log("conectado com o bd.")
    }
})

export { conn }
