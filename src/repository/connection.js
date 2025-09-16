import mysql from "mysql2/promise";

let connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "chatsistem",
});

export { connection };
