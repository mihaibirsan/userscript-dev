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

app.get('/script.user.js', function (req, res) {
  res.sendFile(WATCHED_FILE);
})

app.listen(3000)
