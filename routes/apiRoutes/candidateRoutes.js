const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// Get all candidates. Uses endpoint /api/candidates and the callback function handles the client's
// request and the database's response. The get() method is wrapped around the database call that we
// made earlier and modify it a bit. The SQL statement SELECT * FROM candidates is assigned to the sql
// variable. Instead of logging the error, a status code of 500 is sent and the error message is placed
// within a JSON object, to be handled by the error-handling conditional statement. The 500 status code
// indicates a server error, different from a 404, which is a user request error. If the error is
// encountered, the return statement will exit the database. If no error, err is null and the response
// is sent back with a message of success.
router.get('/api/candidates', (req, res) => {
    const sql = `SELECT * FROM candidates`;

    db.query(sql, (err, rows) => {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
    }
    res.json({
        message: 'success',
        data: rows
    });
    });
});

// Get a single candidate. Using the get() route method again. This time the endpoint has a route
// parameter that will hold the value of the id to specify which candidate we'll select from the
// database. In the database call, we'll assign the captured value populated in the req.params
// object with the key id to params. The database then queries the candidates table with this id
// and retrieves the row specific. Because params can be accepted in the database call as an array,
// params is assigned as an array with a single element, req.params.id. The error status code was
// changed to 400 to notify the client that their request wasn't accepted and to try a different
// request. In the route response, we'll send the row back to the client in a JSON object.
router.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT candidates.*, parties.name 
            AS party_name 
            FROM candidates 
            LEFT JOIN parties 
            ON candidates.party_id = parties.id`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
    if (err) {
        res.status(400).json({ error: err.message });
        return;
    }
    res.json({
        message: 'success',
        data: row
    });
    });
});

// Create a candidate. We use the HTTP request method post() to insert a candidate into the candidates
// table. Endpoint is /api/candidate. In the callback function, we'll use the body req.body to populate
// the candidate's data. We use object destructuring to pull the body property out of the request object.
// Until now, we've been passing the entire request object to the routes in the req parameter. In the
// callback function block, we assign errors to receive the return from the inputCheck function. inputCheck
// verifies that user info in the request can create a candidate.

// We have to validate the user data before the changes are inserted in the database to keep the database
// free of erroneous data and avoid wasting resources on expensive database calls. If the inputCheck()
// function returns an error, a 400 status code is returned to prompt for a different user request with a
// JSON object that contains the reasons for the errors.
router.post('/api/candidate', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    // MYSQL will autogenerate an id and relieve us of the responsibility to know which id is available
    // to populate. The params assignment containers three elements in its array that contains the user
    // data collected in req.body. Using the query() method, we execute the prepared SQL statement and 
    // send the response using the res.json() method with a success message and the user data that was
    // used to create the new data entry.
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected) VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

// Update a candidate's party
router.put('/api/candidate/:id', (req, res) => {
    const sql = `UPDATE candidates SET party_id = ? 
                WHERE id = ?`;
    const params = [req.body.party_id, req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            // check if a record was found
        } else if (!result.affectedRows) {
            res.json({
                message: 'Candidate not found'
            });
        } else {
            res.json({
                message: 'success',
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
});

// Delete a candidate. The ? denotes a placeholder, making this a "prepared statement", which 
// can execute the same SQL statements repeatedly using different values in place of a placeholder.
// An additional param argument following the prepared statement provides values to use in place
// of the prepared statement's placeholders. 1 (the param) is hardcoded temporarily to show how 
// prepared statements work, so this would be the same as saying DELETE FROM candidates WHERE id = 1.
// You can also use the param argument as an array to hold multiple values for the placeholders.

// We use the HTTP request method delete(). The endpoint here also includes a route parameter to
// uniquely identify the candidate to remove. We're using a prepared SQL statement with a placeholder.
// We'll assign the req.params.id to params. The JSON object route response will be the message "delete",
// with the changes property set to result.affectedRows. This will verify whether any rows were changed. 

// If the user tries to delete a candidate that doesn't exist, that is where the else if statement comes
// in. If there are no affectedRows as a result of the delete query, that means that there was no
// candidate by that id. Therefore, we should return an appropriate message to the client, such as
// "Candidate not found." To test, we unfortunately can't simply plug the endpoint into the browser
// to check because we can only test the get() request in the browser manually, and not delete(). We
// will need Insomnia.
router.delete('/api/candidate/:id', (req, res) => {
    const sql = `SELECT candidates.*, parties.name 
            AS party_name 
            FROM candidates 
            LEFT JOIN parties 
            ON candidates.party_id = parties.id 
            WHERE candidates.id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
    if (err) {
        res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
        res.json({
        message: 'Candidate not found'
        });
    } else {
        res.json({
        message: 'Successfully deleted',
        changes: result.affectedRows,
        id: req.params.id
        });
    }
    });
});

module.exports = router;

// GET a single candidate through querying the database. The db object uses the query() method
// which runs the SQL query and executes the callback with all resulting rows that match the
// query. Once the method executes the SQL command, the callback function captures the responses
// from the query in two variables: the err, which is an error response, and rows, which is the
// database query response. If there are no errors in the SQL query, the err value is null. This
// method is the key component that allows SQL commands to be written in a Node.js application.
// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(row);
// });

// Create a candidate. INSERT INTO is a command for the candidates table to add the values that are
// assigned to params. The four placeholders must match the four values in params, so we must use an
// array. Since candidates has four columns (id, first_name, last_name, industry_connected), we need
// four placeholders (?) for those four values. The values in the params array must match the order of
// the placeholders.
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) VALUES (?,?,?,?)`;
// const params = [1, 'Ronald', 'Firbank', 1];

// db.query(sql, params, (err, result) => {
//     if (err) {
//     console.log(err);
//     }
//     console.log(result);
// });