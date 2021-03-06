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
var webdriver = require('selenium-webdriver');
var By = webdriver.By;
var chrome = require('selenium-webdriver/chrome');
var chromeOption = new chrome.Options();
var driver = null;
require('chromedriver');// 2.32.3

var port = normalizePort(process.env.PORT || 3000);
app.set('port', port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

var xvrf, chrome, ffmpeg;


app.get('/api', function (req, res) {
	console.log('/api');
	res.send(200);
});

app.get('/api/start', function (req, res) {
	console.log('/api/start');


	// console.log("111");
	// xvrf = exec('xvfb-run --listen-tcp --server-num 44 -s "-ac -screen 0 1920x1080x24" google-chrome --allow-running-insecure-content --window-size=1920,1080 --start-fullscreen --disable-infobars --disable-notifications https://test.tyle.io/labs/image2video?ip=' + '52.79.228.120' + ' > /dev/null', function (error, stdout, stderr) {
	// 	console.log('stdout: ' + stdout);
	// 	console.log('stderr: ' + stderr);
	// 	if (error !== null) {
	// 		console.log('exec error: ' + error);
	// 	}
	// });
	//
	// setTimeout(function () {
	// 	ffmpeg = spawn('ffmpeg', ['-t', 10, '-y', '-f', 'x11grab', '-draw_mouse', 0, '-video_size', '600x600', '-i', ':44+0,0', '-vcodec', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'ultrafast', '-r', 60, '-crf', 15, '-tune', 'zerolatency', '-filter:a', 'volume=1.0', '-c:a', 'aac', '-strict', 'experimental', '-ac', 2, '-b:a', '192k', __dirname + '/test_10.mp4'], {stdio: 'inherit'});
	//
	// }, 5000);

/*
	var rXvfb = require('xvfb');
	xvrf = new rXvfb({
		displayNum: 44,
		// xvfb_args: [
		// 	'-screen 0 1920x1080x24'
		// ]
	});
	var pro = xvrf.startSync();

	// chrome = pro.spawn('google-chrome', [' --allow-running-insecure-content ', '--window-size=1920,1080', '--start-fullscreen', '--disable-infobars', '--disable-notifications', 'https://tyle.io/player/r4goi5fmzwgox7', '>', '/dev/null'], {stdio: 'inherit'});
	pro.exec('google-chrome --allow-running-insecure-content --window-size=1920,1080 --start-fullscreen --disable-infobars --disable-notifications https://test.tyle.io/labs/image2video?ip=' + '52.79.228.120' + ' > /dev/null', function (error, stdout, stderr) {
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
		if (error !== null) {
			console.log('exec error: ' + error);
		}
	});
*/

	/*xvrf = exec('sh ' + __dirname + '/ba.sh', function (error, stdout, stderr) {
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
		if (error !== null) {
			console.log('exec error: ' + error);
		}
	});*/

	/*var chrome_count = 0;
	startChrome(chrome_count++,9222,function chromeStared(err,id,chrome){
		res.send('Chrome '+id+' Started\r\n');
		console.log('Simulating some data parsing');
		// setTimeout(function(){
		// 	console.log('Shutdown chrome '+id);
		// 	chrome.kill('doh!');
		// }, 1000);

		ffmpeg = spawn('ffmpeg', [/!*'-t', 10, *!/'-y', '-f', 'x11grab', '-draw_mouse', 0, '-video_size', '800x800', '-i', ':44+0,0', '-vcodec', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'ultrafast', '-r', 60, '-crf', 15, '-tune', 'zerolatency', '-filter:a', 'volume=1.0', '-c:a', 'aac', '-strict', 'experimental', '-ac', 2, '-b:a', '192k', __dirname + '/test_10.mp4'], {stdio: 'inherit'});
		setTimeout(function(){
			ffmpeg.kill();
		}, 15000);

	});
	function startChrome(id,port,callback){
		var terminal = spawn('bash');
		var chrome = {};

		terminal.on('exit', function (code) {

			console.log('Starting chrome');
			// chrome = spawn('google-chrome',[
			// 	'--remote-debugging-port='+port,
			// 	'http://www.chrome.com'
			// ]);

			chrome = spawn('google-chrome', [
				'--remote-debugging-port='+port,
				// '--allow-running-insecure-content',
				// '--window-size=1920,1080',
				// '--start-fullscreen',
				// '--disable-infobars',
				// '--disable-notifications',
				'https://tyle.io/player/r4goi5fmzwgox7'
			]);

			callback(null,id,chrome);
		});

		setTimeout(function() {
			console.log('Sending stdin to terminal');
			terminal.stdin.write('echo "Hello"');
			// terminal.stdin.write('rm -rf /Volumes/DATA/repos/scrapper/userdata'+'\n');
			// terminal.stdin.write('mkdir /Volumes/DATA/repos/scrapper/userdata'+'\n');
			// terminal.stdin.write('touch "/Volumes/DATA/repos/scrapper/userdata/First Run"'+'\n');
			// terminal.stdin.write('chmod 777 "/Volumes/DATA/repos/scrapper/userdata/First Run"'+'\n');
			terminal.stdin.end();
		}, 5000);
	}*/

	// chrome = pro.spawn('google-chrome', [' --allow-running-insecure-content ', '--window-size=1920,1080', '--start-fullscreen', '--disable-infobars', '--disable-notifications', 'https://tyle.io/player/r4goi5fmzwgox7', '>', '/dev/null'], {stdio: 'inherit'});
	// xvrf = spawn('xvfb-run', ['--listen-tcp', '--server-num', '44', '-s', '"-ac -screen 0 1920x1080x24"', 'google-chrome', ' --allow-running-insecure-content ', '--window-size=1920,1080', '--start-fullscreen', '--disable-infobars', '--disable-notifications', 'https://tyle.io/player/r4goi5fmzwgox7', '>', '/dev/null'], {stdio: 'inherit'});
	//
	// setTimeout(function () {
	// 	ffmpeg = spawn('ffmpeg', ['-t', 10, '-y', '-f', 'x11grab', '-draw_mouse', 0, '-video_size', '600x600', '-i', ':44+0,0', '-vcodec', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'ultrafast', '-r', 60, '-crf', 15, '-tune', 'zerolatency', '-filter:a', 'volume=1.0', '-c:a', 'aac', '-strict', 'experimental', '-ac', 2, '-b:a', '192k', __dirname + '/test_10.mp4'], {stdio: 'inherit'});
	//
	// 	res.sendStatus(200);
	// }, 5000);

});

app.post('/api/start', function (req, res) {
	console.log('post /api/start');
	ffmpeg = spawn('ffmpeg', ['-t', 10, '-y', '-f', 'x11grab', '-draw_mouse', 0, '-video_size', '600x600', '-i', ':44+0,0', '-vcodec', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'ultrafast', '-r', 60, '-crf', 15, '-tune', 'zerolatency', '-filter:a', 'volume=1.0', '-c:a', 'aac', '-strict', 'experimental', '-ac', 2, '-b:a', '192k', __dirname + '/test_10.mp4'], {stdio: 'inherit'});
	res.sendStatus(200);
});

app.post('/api/upload', function (req, res) {
	res.sendStatus(200);
});

app.get('/api/stop', function (req, res) {
	console.log('/api/stop');
	//
	ffmpeg.kill();
	// xvrf.kill();
	res.sendStatus(200);
})

app.post('/api/stop', function (req, res) {
	console.log('post /api/stop');
	// ffmpeg.kill();

	ffmpeg.kill();
	res.sendStatus(200);
});

app.post('/api/done', function (req, res) {
	console.log('/api/done');
	// xvrf.kill();
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

// var server = http.createServer(app);
// server.listen(port);


server.on('listening', onListening);


function onListening() {
	console.log('onListening');

	xvrf = spawn('xvfb-run', ['--listen-tcp', '--server-num', '44', '-s', '"-ac -screen 0 1920x1080x24"', 'google-chrome', ' --allow-running-insecure-content ', '--window-size=1920,1080', '--start-fullscreen', '--disable-infobars', '--disable-notifications', 'https://test.tyle.io/labs/image2video', '>', '/dev/null'], {stdio: 'inherit'});
	// xvrf = exec('xvfb-run --listen-tcp --server-num 44 -s "-ac -screen 0 1920x1080x24" google-chrome --allow-running-insecure-content --window-size=1920,1080 --start-fullscreen --disable-infobars --disable-notifications https://test.tyle.io/labs/image2video?ip=' + '52.79.228.120' + ' > /dev/null', function (error, stdout, stderr) {
	// 	console.log('stdout: ' + stdout);
	// 	console.log('stderr: ' + stderr);
	// 	if (error !== null) {
	// 		console.log('exec error: ' + error);
	// 	}
	// });

	setTimeout(function () {
		ffmpeg = spawn('ffmpeg', ['-t', 10, '-y', '-f', 'x11grab', '-draw_mouse', 0, '-video_size', '600x600', '-i', ':44+0,0', '-vcodec', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'ultrafast', '-r', 60, '-crf', 15, '-tune', 'zerolatency', '-filter:a', 'volume=1.0', '-c:a', 'aac', '-strict', 'experimental', '-ac', 2, '-b:a', '192k', __dirname + '/test_10.mp4'], {stdio: 'inherit'});
		setTimeout(function(){
			ffmpeg.kill();
		}, 15000);
	}, 5000);

	// setTimeout(function () {
	// 	xvrf = exec('sh ' + __dirname + '/ba.sh', function (error, stdout, stderr) {
	// 		console.log('stdout: ' + stdout);
	// 		console.log('stderr: ' + stderr);
	// 		if (error !== null) {
	// 			console.log('exec error: ' + error);
	// 		}
	// 	});
	// }, 3000);


	// var headless = require('headless');
	// headless(options, function(err, childProcess, servernum) {
	// 	console.log('Xvfb running on server number', servernum);
	// 	console.log('Xvfb pid', childProcess.pid);
	// 	console.log('err should be null', err);
	//
	// 	// var ex = spawn('export', ['DISPLAY=:' + servernum], {stdio: 'inherit'});
	// 	// var ex = exec('export DISPLAY=:' + servernum);
	//
	// 	chromeOption.addArguments('--start-fullscreen');
	// 	chromeOption.addArguments('--disable-infobars');
	// 	chromeOption.addArguments('--disable-notifications');
	// 	chromeOption.addArguments('--headless');
	// 	chromeOption.addArguments('--disable-gpu');
	// 	chromeOption.addArguments('--no-sandbox');
	// 	// chromeOption.addArguments('--remote-debugging-port=4444');
	//
	// 	driver = new webdriver.Builder()
	// 	// .usingServer('http://127.0.0.1:' + servernum)
	// 	// driver.Chrome('path to /chromedriver')
	// 	.forBrowser('chrome')
	// 	.setChromeOptions(chromeOption)
	// 	.build();
	//
	// 	setTimeout(function () {
	//
	// 		driver.get('https://tyle.io/player/r4goi5fmzwgox7');
	//
	// 		ffmpeg = spawn('ffmpeg', ['-t', 20, '-y', '-f', 'x11grab', '-draw_mouse', 0, '-video_size', '900x900', '-i', ':' + servernum + '+0,120', '-vcodec', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'ultrafast', '-r', 60, '-crf', 15, '-tune', 'zerolatency', '-filter:a', 'volume=1.0', '-c:a', 'aac', '-strict', 'experimental', '-ac', 2, '-b:a', '192k', __dirname + '/test_10.mp4'], {stdio: 'inherit'});
	// 		// ffmpeg = spawn('ffmpeg', ['-t', 20, '-y', '-f', 'x11grab', '-draw_mouse', 0, '-video_size', '900x900', '-i', ':4444' + '.' + servernum + '+0,120', '-vcodec', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'ultrafast', '-r', 60, '-crf', 15, '-tune', 'zerolatency', '-filter:a', 'volume=1.0', '-c:a', 'aac', '-strict', 'experimental', '-ac', 2, '-b:a', '192k', __dirname + '/test_10.mp4'], {stdio: 'inherit'});
	// 		// ffmpeg = spawn('ffmpeg', ['-t', 10, '-y', '-f', 'x11grab', '-draw_mouse', 0, '-video_size', '1400x900', '-i', 'http://localhost:4444+0,120', '-vcodec', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'ultrafast', '-r', 60, '-crf', 15, '-tune', 'zerolatency', '-filter:a', 'volume=1.0', '-c:a', 'aac', '-strict', 'experimental', '-ac', 2, '-b:a', '192k', __dirname + '/test_10.mp4'], {stdio: 'inherit'});
	// 	}, 1000);
	// });

	// ffmpeg = spawn('ffmpeg', ['-t', 20, '-y', '-f', 'x11grab', '-draw_mouse', 0, '-video_size', '900x900', '-i', ':0.0' + '+0,0', '-vcodec', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'ultrafast', '-r', 60, '-crf', 15, '-tune', 'zerolatency', '-filter:a', 'volume=1.0', '-c:a', 'aac', '-strict', 'experimental', '-ac', 2, '-b:a', '192k', __dirname + '/test_10.mp4'], {stdio: 'inherit'});
	// ffmpeg = spawn('ffmpeg', ['-t', 20, '-y', '-f', 'x11grab', '-draw_mouse', 0, '-video_size', '900x900', '-i', ':4444' + '.' + servernum + '+0,120', '-vcodec', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'ultrafast', '-r', 60, '-crf', 15, '-tune', 'zerolatency', '-filter:a', 'volume=1.0', '-c:a', 'aac', '-strict', 'experimental', '-ac', 2, '-b:a', '192k', __dirname + '/test_10.mp4'], {stdio: 'inherit'});
	// ffmpeg = spawn('ffmpeg', ['-t', 10, '-y', '-f', 'x11grab', '-draw_mouse', 0, '-video_size', '1400x900', '-i', 'http://localhost:4444+0,120', '-vcodec', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'ultrafast', '-r', 60, '-crf', 15, '-tune', 'zerolatency', '-filter:a', 'volume=1.0', '-c:a', 'aac', '-strict', 'experimental', '-ac', 2, '-b:a', '192k', __dirname + '/test_10.mp4'], {stdio: 'inherit'});


	// setTimeout(function () {
	// 	// var proc = exec('xvfb-run --listen-tcp --server-num 44 --auth-file /tmp/xvfb.auth -s "-ac -screen 0 1920x1080x24" google-chrome --window-size=1920,1080 --start-fullscreen --disable-infobars --disable-notifications https://tyle.io/player/r4goi5fmzwgox7 > /dev/null', function (err, stdout, stderr) {
	// 	// 	if (err) {
	// 	// 		// node couldn't execute the command
	// 	// 		console.log('error xvfb', err);
	// 	// 		return;
	// 	// 	}
	// 	// 	capture.cardPlayerStart();
	// 	// // 	console.log('start xvfb');
	// 	// });
	// 	//
	// 	// proc.on('close', function() {
	// 	// 	console.log('close xvfb');
	// 	// });
	// 	// proc.stdout.on('data', function(data) {
	// 	// 	console.log('stdout xvfb');
	// 	// });
	// 	// proc.stderr.on('data', function(data) {
	// 	// 	console.log('stderr xvfb');
	// 	// });
	//
	// 	// var arg = ('--listen-tcp --server-num 44 -s "-ac -screen 0 1920x1080x24" google-chrome --window-size=1920,1080 --start-fullscreen --disable-infobars --disable-notifications https://tyle.io/player/r4goi5fmzwgox7 > /dev/null').split(' ');
	//
	// 	// xvrf = spawn('xvfb-run', ['--listen-tcp', '--server-num', '44', '-s', '"-ac -screen 0 1920x1080x24"', 'google-chrome', '--window-size=1920,1080', '--start-fullscreen', '--disable-infobars', '--disable-notifications', 'https://tyle.io/player/r4goi5fmzwgox7', '>', '/dev/null'], {stdio: 'inherit'});
	//
	// 	// xvrf = exec('xvfb-run --listen-tcp --server-num 44 -s "-ac -screen 0 1920x1080x24" google-chrome --window-size=1920,1080 --start-fullscreen --disable-infobars --disable-notifications https://tyle.io/player/r4goi5fmzwgox7 > /dev/null', function (error, stdout, stderr) {
	// 	// 	console.log('stdout: ' + stdout);
	// 	// 	console.log('stderr: ' + stderr);
	// 	// 	if (error !== null) {
	// 	// 		console.log('exec error: ' + error);
	// 	// 	}
	// 	// });
	//
	// 	var Pusher = require('pusher-js');
	// 	var config = {
	// 		"PUSHER_KEY": "55d33f290d0b221917a0",
	// 		"PUSHER_SECRET": "12907a58891f629ee561",
	// 		"PUSHER_APP_ID": "76479",
	// 		"PUSHER_CLUSTER": "mt1"
	// 	};
	// 	var pusher = new Pusher(config['PUSHER_KEY'], {
	// 		cluster: config['PUSHER_CLUSTER'],
	// 		encrypted: true
	// 	});
	//
	// 	var jsSHA = require("jssha");
	// 	var shaObj = new jsSHA("SHA-1", "TEXT");
	// 	shaObj.update("흥짱" + "test_xvfb_99");
	// 	var hash = shaObj.getHash("HEX");
	//
	// 	var channel = pusher.subscribe('user-channel-' + hash);
	// 	channel.bind('start-xvfb', function (data) {
	// 		console.log(data);
	// 		// xvrf = exec('xvfb-run --listen-tcp --server-num 44 -s "-ac -screen 0 1920x1080x24" google-chrome --window-size=1920,1080 --start-fullscreen --disable-infobars --disable-notifications https://test.tyle.io/player/zc4td5fb1z37ns > /dev/null', function (error, stdout, stderr) {
	// 		// 	console.log('stdout: ' + stdout);
	// 		// 	console.log('stderr: ' + stderr);
	// 		// 	if (error !== null) {
	// 		// 		console.log('exec error: ' + error);
	// 		// 	}
	// 		// });
	// 	});
	// 	channel.bind('start-ffmpeg', function (data) {
	// 		// ffmpeg = spawn('ffmpeg', ['-t', 10, '-y', '-f', 'x11grab', '-draw_mouse', 0, '-video_size', '900x900', '-i', ':44+0,120', '-vcodec', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'ultrafast', '-r', 60, '-crf', 15, '-tune', 'zerolatency', '-filter:a', 'volume=1.0', '-c:a', 'aac', '-strict', 'experimental', '-ac', 2, '-b:a', '192k', __dirname + '/test_10.mp4'], {stdio: 'inherit'});
	// 	});
	// 	channel.bind('stop-ffmpeg', function (data) {
	// 		// xvrf.kill();
	// 		// ffmpeg.kill();
	// 	});
	// }, 500)
}

// xvrf = exec('xvfb-run --listen-tcp --server-num 44 -s "-ac -screen 0 1920x1080x24" google-chrome --window-size=1920,1080 --start-fullscreen --disable-infobars --disable-notifications https://tyle.io/player/r4goi5fmzwgox7 > /dev/null', function (error, stdout, stderr) {
// 	console.log('stdout: ' + stdout);
// 	console.log('stderr: ' + stderr);
// 	if (error !== null) {
// 		console.log('exec error: ' + error);
// 	}
// });

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