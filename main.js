'use strict';
const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
const exec = require('child_process').exec;
const net = require('net');
const http = require('http');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  var child = exec('ssh -nNTL 32400:localhost:32400 tv@308jackson.ddns.net');

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    "node-integration": "iframe",
    "web-preferences": {
      "web-security": false
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
    child.kill();
    });
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.

app.on('ready', function() {
});
