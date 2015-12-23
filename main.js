'use strict';
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const exec = require('child_process').exec;
const net = require('net');
const http = require('http');

let mainWindow;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  var child = exec('ssh -nNTL 32400:localhost:32400 tv@308jackson.ddns.net');

  var openPage = function() {
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      "node-integration": "iframe",
      "web-preferences": {
        "web-security": false
      }
    });

    mainWindow.loadURL('file://' + __dirname + '/index.html');

    mainWindow.on('closed', function() {
      mainWindow = null;
      child.kill();
    });
  };

  var connect = function() {
    http.request('http://localhost:32400/web', function() {
      openPage();
    }).on('error', function(err) {
      console.log(err);
      setTimeout(function(), {
        console.log('doge');
        connect();
      });
    });
  }

  connect();
});
