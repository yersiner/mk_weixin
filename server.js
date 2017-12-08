#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('./app');
var debug = require('debug')('microtechwc:server');
var http = require('http');
var https = require("https");
var fs = require("fs");
var options = {
  key : fs.readFileSync("./cert/214257692290544.key"),
  cert : fs.readFileSync("./cert/214257692290544.pem")
};

/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || '443');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

var httpsServer = https.createServer(options, app).listen(port, function () {
    console.log('Https server listening on port ' + port);
});

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(80,"192.168.1.136");
httpsServer.on('error', onError);
httpsServer.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr =httpsServer.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}