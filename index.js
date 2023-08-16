const express = require('express');
const app = express();
const PORT = 3000;

// Root route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the new Home Page!</h1>');
});

// About route
app.get('/about', (req, res) => {
    res.send('<h1>This is the new About Us Page.</h1>');
});

// Contact route
app.get('/contact', (req, res) => {
    res.send('<h1>This is the new Contact Us Page.</h1>');
});

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}`);
});

module.exports = {app, server}