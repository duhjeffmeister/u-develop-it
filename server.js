// Imports the Express module
const express = require('express');

// Imports connection.js module
const db = require('./db/connection');

// Imports routes
const apiRoutes = require('./routes/apiRoutes');

// Establishes the port and using app reduces the code we have to type
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// After using middleware use apiRoutes
app.use('/api', apiRoutes);

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

// Displays what port number the server is running on
// Start server after DB connection
db.connect(err => {
    if (err) throw err;
        console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});