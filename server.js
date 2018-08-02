var express = require('express');
var app = express();

var http = require('http');
var https = require('https');
var capture = require('./capture');
var spawn = require('child_process').spawn;
var spawnSync = require('child_process').spawnSync;
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

var xvrf, ffmpeg;


app.get('/api', function (req, res) {
	res.send(200);
});

app.post('/api/start', function (req, res) {
	console.log('/api/start');
	ffmpeg = spawn('ffmpeg', ['-t', 10, '-y', '-f', 'x11grab', '-draw_mouse', 0, '-video_size', '900x900', '-i', ':44+0,120', '-vcodec', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'ultrafast', '-r', 60, '-crf', 15, '-tune', 'zerolatency', '-filter:a', 'volume=1.0', '-c:a', 'aac', '-strict', 'experimental', '-ac', 2, '-b:a', '192k', __dirname + '/test_10.mp4'], {stdio: 'inherit'});

});

app.post('/api/upload', function (req, res) {
	res.sendStatus(200);
});

app.post('/api/stop', function (req, res) {
	console.log('/api/stop');
	ffmpeg.kill();
});

app.post('/api/done', function (req, res) {
	console.log('/api/done');
	xvrf.kill();
});

process.on('exit', function () {
	xvrf.kill();
	ffmpeg.kill();
});

var options = {
	// key: fs.readFileSync('/home/ubuntu/dev/test-xvfb/key.pem'),
	// cert: fs.readFileSync('/home/ubuntu/dev/test-xvfb/cert.pem')
	key: fs.readFileSync(__dirname + '/key.pem'),
	cert: fs.readFileSync(__dirname + '/cert.pem')
};
var port2 = 443;
var server = https.createServer(options, app).listen(port2, function () {
	console.log("Https server listening on port " + port2);
});


server.on('listening', onListening);


function onListening() {
	console.log('onListening');

	setTimeout(function () {
		// var proc = exec('xvfb-run --listen-tcp --server-num 44 --auth-file /tmp/xvfb.auth -s "-ac -screen 0 1920x1080x24" google-chrome --window-size=1920,1080 --start-fullscreen --disable-infobars --disable-notifications https://tyle.io/player/r4goi5fmzwgox7 > /dev/null', function (err, stdout, stderr) {
		// 	if (err) {
		// 		// node couldn't execute the command
		// 		console.log('error xvfb', err);
		// 		return;
		// 	}
		// 	capture.cardPlayerStart();
		// // 	console.log('start xvfb');
		// });
		//
		// proc.on('close', function() {
		// 	console.log('close xvfb');
		// });
		// proc.stdout.on('data', function(data) {
		// 	console.log('stdout xvfb');
		// });
		// proc.stderr.on('data', function(data) {
		// 	console.log('stderr xvfb');
		// });

		var arg = ('--listen-tcp --server-num 44 -s "-ac -screen 0 1920x1080x24" google-chrome --window-size=1920,1080 --start-fullscreen --disable-infobars --disable-notifications https://tyle.io/player/r4goi5fmzwgox7 > /dev/null').split(' ');

		xvrf = spawn('xvfb-run', ['--listen-tcp', '--server-num', '44', '-s', '"-ac -screen 0 1920x1080x24"', 'google-chrome', '--window-size=1920,1080', '--start-fullscreen', '--disable-infobars', '--disable-notifications', 'https://tyle.io/player/r4goi5fmzwgox7', '>', '/dev/null'], {stdio: 'inherit'});

		// xvrf = exec('xvfb-run --listen-tcp --server-num 44 -s "-ac -screen 0 1920x1080x24" google-chrome --window-size=1920,1080 --start-fullscreen --disable-infobars --disable-notifications https://tyle.io/player/r4goi5fmzwgox7 > /dev/null', function (error, stdout, stderr) {
		// 	console.log('stdout: ' + stdout);
		// 	console.log('stderr: ' + stderr);
		// 	if (error !== null) {
		// 		console.log('exec error: ' + error);
		// 	}
		// });

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