var express = require('express');
var path = require('path');

var fs = require('fs');

var app = express();

var server = require('http').createServer(app);

var io = require('socket.io').listen(server);

connections = [];

server.listen(3000);
console.log("Server successfully running on port : 3000");

app.use(express.static(path.join(__dirname, 'assets')));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket) {
	connections.push(socket);
	console.log('Connected : %s sockets connected', connections.length);

	socket.on('disconnect', function(data) {
		connections.splice(connections.indexOf(socket), 1);
		console.log('Disconnected : %s sockets connected', connections.length);
	});

	socket.on('trigger', function(file_name) {
		if (fs.existsSync(file_name) == false) {
			io.sockets.emit('send data', {msg: 'Please enter a valid log file name', length: len, next: 'n'});
		} else {
			var content = fs.readFileSync(file_name, { encoding: 'utf8' });

			content = content.split("\n");

			content.splice(-1,1);

			var len = content.length;

			var next = 'n';

			for (var i = 0; i < len; i++) {
				if(i == len - 1)
					next = 'y';
				io.sockets.emit('send data', {msg: content[i], length: len, next: next});
			}
		}
				
	});

	socket.on('height', function(data) {
		var i = '';
		var content = fs.readFileSync('serv.log', { encoding: 'utf8' });

		content = content.split("\n");
		
		content.splice(-1,1);

		var len = content.length;

		if (len > data) {
			i = content.pop();
		}
		
		sleep(1000);
		
		checkMore(i, len);

	});

	function checkMore(itir, len) {
		io.sockets.emit('send data', {msg: itir, length: len, next: 'y'});
	}
});

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

