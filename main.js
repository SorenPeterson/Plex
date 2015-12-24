/*jslint node: true */
(function () {
    'use strict';

    var electron = require('electron'),
        app = electron.app,
        BrowserWindow = electron.BrowserWindow,
        exec = require('child_process').exec,
        portscanner = require('portscanner'),
        mainWindow;

    app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('ready', function () {
        var child = exec('ssh -nNTL 32400:localhost:32400 tv@308jackson.ddns.net');

        function openPage() {
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
        }

        portscanner.checkPortStatus(32400, '127.0.0.1', function (error, status) {
            if (status === 'open') {
                openPage();
            } else {
                app.quit();
            }
            return error;
        });
    });

}()); // This is the encapsulator
