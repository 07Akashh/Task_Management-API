const express = require('express');

const middleware = express();

middleware.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = middleware;