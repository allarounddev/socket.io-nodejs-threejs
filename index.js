// index.js: The main routes for the web app

// Imports
var express = require('express');

// Routes
var router = express.Router();
router.get('/', function(req, res, next) {
  if (!req.user) { return res.render('chat'); }
  next();
}, function(req, res, next) { res.redirect('/chat'); });
router.get('/chat', function(req, res, next) { res.render('chat', { user: req.user }); });

// Export
module.exports = router;
