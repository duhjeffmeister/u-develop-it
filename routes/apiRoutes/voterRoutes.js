const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// Route performs SELECT * FROM voters and return the rows on success or a 500 status if there
// were errors.
router.get('/voters', (req, res) => {
    // In SQL, rows can be sorted on retrieval simply by including an ORDER BY clause. For 
    // descending order, add a DESC keyword like so: ORDER by last_name DESC
    const sql = `SELECT * FROM voters ORDER BY last_name`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows,
        });
    });
});

// Get single voter
router.get('/voter/:id', (req, res) => {
    const sql = `SELECT * FROM voters WHERE id = ?`;
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

// POST route to update email address (PUT request) and deactivate their account (DELETE request)
// The ? prepared statements protect us from malicious data, but we need to prevent blank records
// from being created, done through data validation.
router.post('/voter', ({ body }, res) => {
    // Data validation
    const errors = inputCheck(body, 'first_name', 'last_name', 'email');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `INSERT INTO voters (first_name, last_name, email) VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.email];

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

// PUT route so users can update their email address. Requires a combination of req.params (to 
// capture who is being updated) and req.body (to capture what is being updated).
router.put('/voter/:id', (req, res) => {
    // Data validation
    const errors = inputCheck(req.body, 'email');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `UPDATE voters SET email = ? WHERE id = ?`;
    const params = [req.body.email, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json({
            message: 'Voter not found'
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

// DELETE route to remove voters from the database. We didn't create a params array to store the
// req.params.id. Although creating semantic variable names will increase your code's legibility, 
// there is a cost due to allocating memory to store the object. Without the params array, the code
// is just as legible without the extra expenditure.
router.delete('/voter/:id', (req, res) => {
    const sql = `DELETE FROM voters WHERE id = ?`;

    db.query(sql, req.params.id, (err, result) => {
        if (err) {
            res.status(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
            message: 'Voter not found'
            });
        } else {
            res.json({
            message: 'deleted',
            changes: result.affectedRows,
            id: req.params.id
            });
        }
    });
});

module.exports = router;