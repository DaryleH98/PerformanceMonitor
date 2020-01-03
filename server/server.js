const express = require('express')
const cluster = require('cluster')
const net = require('net')
const socketio = require('socket.io')
const socketMain = require('./socketMain')

const port = 8181;
const num_processes = require('os').cpus().length;
const io_redis = require('socket.io-redis');
const farmhash = require('farmhash');

if (cluster.isMaster) {
	// This stores our workers. We need to keep them to be able to reference
	// them based on source IP address. 
	let workers = [];

	let spawn = function(i) {
		workers[i] = cluster.fork();

		workers[i].on('exit', function(code, signal) {
			spawn(i);
		});
    };

    // Spawn workers
	for (var i = 0; i < num_processes; i++) {
		spawn(i);
	}
	const worker_index = function(ip, len) {
		return farmhash.fingerprint32(ip) % len; // Farmhash is the fastest and works with IPv6, too
	};

	const server = net.createServer({ pauseOnConnect: true }, (connection) =>{
		// We received a connection and need to pass it to the appropriate
		// worker.
		let worker = workers[worker_index(connection.remoteAddress, num_processes)];
		worker.send('sticky-session:connection', connection);
    });
    server.listen(port);
    console.log(`Master listening on port ${port}`);
} else {
    const server = app.listen(0, 'localhost');
    // console.log("Worker listening...");    
	const io = socketio(server);

	// Tell Socket.IO to use the redis adapter. 
	io.adapter(io_redis({ host: 'localhost', port: 6379 }));

    // Here you might use Socket.IO middleware for authorization etc.
	// on connection, send the socket over to our module with socket stuff
    io.on('connection', function(socket) {
		socketMain(io,socket);
		// console.log(`connected to worker: ${cluster.worker.id}`);
    });

	// Listen to messages sent from the master. Ignore everything else.
	process.on('message', function(message, connection) {
		if (message !== 'sticky-session:connection') {
			return;
		}
		// Emulate a connection event on the server by emitting the
		// event with the connection the master sent us.
		server.emit('connection', connection);

		connection.resume();
	});
}
