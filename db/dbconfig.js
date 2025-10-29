const mysql2 = require("mysql2");
const fs = require("fs"); 

// Create connection pool
const mysqlconnection = mysql2.createPool({
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port:process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  connectionLimit: process.env.DB_CONNECTION_LIMIT || 10,
  ssl: {
    ca: fs.readFileSync(process.env.DB_SSL_CA)
  }

});

// Test the connection

mysqlconnection.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("The connection is successful");
    connection.release(); // release back to pool
  }
});
module.exports = mysqlconnection.promise();
