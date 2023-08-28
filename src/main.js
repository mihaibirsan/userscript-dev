#!/usr/bin/env node

const fs = require('fs');
const express = require('express')
const opener = require("opener");

const TARGET_FILENAME = process.argv[2];
const WATCHED_FILE = process.cwd() + '/' + TARGET_FILENAME;

if (!fs.existsSync(WATCHED_FILE)) {
  console.log('File not found: ' + WATCHED_FILE);
  process.exit(1);
}

const app = express()

opener(`http://localhost:3000/${encodeURIComponent(TARGET_FILENAME)}`);

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get(`/${encodeURIComponent(TARGET_FILENAME)}`, function (req, res) {
  // Serve the userscript header from the original file
  // and the body from the shell file
  const script = fs.readFileSync(WATCHED_FILE, 'utf8');
  const shell = fs.readFileSync(__dirname + '/shell.js', 'utf8');
  let header = script.split('// ==/UserScript==')[0];
  // Grant GM_xmlhttpRequest if not present
  if (!header.match(/\/\/\s*@grant\s*GM_xmlhttpRequest/)) {
    // Remove conflicting @grant none
    if (header.match(/\/\/\s*@grant\s*none\s*/)) {
      header = header.replace(/\/\/\s*@grant\s*none\s*/, '');
    }
    header += '// @grant GM_xmlhttpRequest\n';
  }
  const body = shell;
  res.set('Content-Type', 'application/javascript');
  res.send(header + '// ==/UserScript==\n' + body);
})

// NOTE: Consider sending the mtime as a response header
app.get('/userscript.js', function (req, res) {
  res.sendFile(WATCHED_FILE);
})

// An endpoint that returns the modified time of the watched file
app.get('/mtime', function (req, res) {
  res.send(fs.statSync(WATCHED_FILE).mtime.getTime().toString());
})

app.listen(3000)
