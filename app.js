// app.js: The main web app file.

// Server port
const PORT = 80;

// Imports
var express = require('express');
var http = require('http');
var createError = require('http-errors');
var path = require('path');

// App files
var initSocketIO = require("./socketio.js");

// Web server
var app = express();
var server = http.createServer(app);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Routes
app.use('/', require('./index.js'));

// Init
initSocketIO(server);

// Errors
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Start
server.listen(PORT);
console.log(`Web server listening at http://127.0.0.1:${PORT}`);

// Export
module.exports = app;
