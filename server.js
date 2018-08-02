var express = require('express');
var app = express();

var http = require('http');
var https = require('https');
var capture = require('./capture');
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
var cors = require('cors');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var fs = require('fs');


var port = normalizePort(process.env.PORT || 3000);
app.set('port', port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());



app.get('/api', function (req, res) {
	res.send(200);
});

app.post('/api/start', function (req, res) {
	var params = req.body;

	capture.startFfmpegPromise(params)
	.then(function() {
		res.sendStatus(200);
	}).catch(function () {
		res.status(422).json('error start');
	})
});

app.post('/api/upload', function (req, res) {
	res.sendStatus(200);
});

app.post('/api/stop', function (req, res) {
	capture.stopFfmpeg().then(function () {

	});
	res.sendStatus(200);
});

app.post('/api/done', function (req, res) {
	res.sendStatus(200);
});

var options = {
	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem')
};
var port2 = 443;
var server = https.createServer(options, app).listen(port2, function () {
	console.log("Https server listening on port " + port2);
});


server.on('listening', onListening);

function onListening() {
	console.log('onListening');

	setTimeout(function () {
		exec('xvfb-run --listen-tcp --server-num 44 --auth-file /tmp/xvfb.auth -s "-ac -screen 0 1920x1080x24"', function (err, stdout, stderr) {
			if (err) {
				// node couldn't execute the command
				console.log('error xvfb');
				return;
			}
			capture.cardPlayerStart();
			console.log('start xvfb');
		});
	}, 500)
}

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