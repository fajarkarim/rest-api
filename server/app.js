require('dotenv').config()
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var index = require('./routes/index');
var users = require('./routes/users');
var dbUrl = process.env.DB_URL

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/api/users', users);

mongoose.connect(dbUrl, err => {
  if (err) console.log(`database not connected`);
  else {
    console.log(`database connected`);
  }
})
console.log(`listening on port 3000`);

module.exports = app;
