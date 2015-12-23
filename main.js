/*jslint node: true */
(function () {
    'use strict';

    var electron = require('electron'),
        app = electron.app,
        BrowserWindow = electron.BrowserWindow,
        exec = require('child_process').exec,
        http = require('http'),
        mainWindow;

    app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('ready', function () {
        var child = exec('ssh -nNTL 32400:localhost:32400 tv@308jackson.ddns.net'),
            openPage = function () {
                mainWindow = new BrowserWindow({
                    width: 800,
                    height: 600,
                    "node-integration": "iframe",
                    "web-preferences": {
                        "web-security": false
                    }
                });

                /*jslint nomen: true*/
                mainWindow.loadURL('file://' + __dirname + '/index.html');
                /*jslint nomen: false*/

                mainWindow.on('closed', function () {
                    mainWindow = null;
                    child.kill();
                });
            },
            connect = function () {
                http.request('http://localhost:32400/web', function () {
                    openPage();
                }).on('error', function (err) {
                    console.log(err);
                    setTimeout(function () {
                        console.log('doge');
                        connect();
                    });
                });
            };

        connect();
    });

}()); // This is the encapsulator
