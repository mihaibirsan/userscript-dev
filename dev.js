const fs = require('fs');
const express = require('express')
const opener = require("opener");

const app = express()

const WATCHED_FILE = __dirname + '/script.user.js';

opener("http://localhost:3000/shell.user.js");

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/shell.user.js', function (req, res) {
  res.sendFile(__dirname + '/shell.user.js')
})

// NOTE: Consider sending the mtime as a response header
app.get('/script.user.js', function (req, res) {
  res.sendFile(WATCHED_FILE);
})

// An endpoint that returns the modified time of the watched file
app.get('/mtime', function (req, res) {
  res.send(fs.statSync(WATCHED_FILE).mtime.getTime().toString());
})

app.listen(3000)
