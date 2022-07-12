// Imports the Express module
const express = require('express');

// Imports the MySQL2 module
const mysql = require('mysql2');

// Establishes the port and using app reduces the code we have to type
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: '',
        database: 'election'
    },
    console.log('Connected to the election database.')
);

// GET a single candidate through querying the database. The db object uses the query() method
// which runs the SQL query and executes the callback with all resulting rows that match the
// query. Once the method executes the SQL command, the callback function captures the responses
// from the query in two variables: the err, which is an error response, and rows, which is the
// database query response. If there are no errors in the SQL query, the err value is null. This
// method is the key component that allows SQL commands to be written in a Node.js application.
db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
    if (err) {
        console.log(err);
    }
    console.log(row);
});

// Delete a candidate. The ? denotes a placeholder, making this a "prepared statement", which 
// can execute the same SQL statements repeatedly using different values in place of a placeholder.
// An additional param argument following the prepared statement provides values to use in place
// of the prepared statement's placeholders. 1 (the param) is hardcoded temporarily to show how 
// prepared statements work, so this would be the same as saying DELETE FROM candidates WHERE id = 1.
// You can also use the param argument as an array to hold multiple values for the placeholders.
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });

// Create a candidate. INSERT INTO is a command for the candidates table to add the values that are
// assigned to params. The four placeholders must match the four values in params, so we must use an
// array. Since candidates has four columns (id, first_name, last_name, industry_connected), we need
// four placeholders (?) for those four values. The values in the params array must match the order of
// gthe placeholders.
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) VALUES (?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, result) => {
    if (err) {
    console.log(err);
    }
    console.log(result);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

// Displays what port number the server is running on
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});