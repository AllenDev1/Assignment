const mysql = require("mysql2");
const fs = require("fs");

// Read the SQL script file
const script = fs.readFileSync("./database/tables.sql", "utf8");
console.log("SQL script:", script);

const connection = mysql.createConnection({
	host: process.env.MY_SQL_HOST,
	user: process.env.MY_SQL_USER,
	password: process.env.MY_SQL_PASSWORD,
	database: process.env.MY_SQL_DB,
});

connection.connect((err) => {
	if (err) throw err;
	console.log("Connected to the MySQL server.");

	// Split the script into separate statements
	const statements = script.split(";");

	// Execute each SQL statement
	connection.connect((error) => {
		if (error) {
			console.error("Error connecting to the database:", error);
			throw error;
		}

		statements.forEach((statement) => {
			if (statement.trim()) {
				connection.query(statement, (queryError, results) => {
					if (queryError) {
						console.error("Error executing statement:", queryError);
						throw queryError;
					}
					console.log("Statement executed successfully");
				});
			}
		});

	
	});
});

module.exports = connection;
