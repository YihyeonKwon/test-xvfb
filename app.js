/*
var headless = require('headless');
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;


var arg = ('google-chrome --window-size=1920,1080 --start-fullscreen --disable-infobars --disable-notifications https://tyle.io/player/r4goi5fmzwgox7').split(' ');
var options = {
	display: {width: 1920, height: 1080, depth: 32},
	servernum: 44,
	args: ['-extension', 'RANDR'],
	stdio: 'inherit'
};

headless(options, function(err, childProcess, servernum) {
	// childProcess is a ChildProcess, as returned from child_process.spawn()
	console.log('Xvfb running on server number', servernum);
	console.log('Xvfb pid', childProcess.pid);
	console.log('err should be null', err);

	setTimeout(function () {
		var command = '';
		command += 'ffmpeg -y -f x11grab -draw_mouse 0 -video_size 900x900 -i :' + servernum + '+0,120 -vcodec libx264 -pix_fmt yuv420p -preset ultrafast -r 60 -crf 15 -tune zerolatency -filter:a "volume=1.0" -c:a aac -strict experimental -ac 2 -b:a 192k /home/ubuntu/dev/test-xvfb/test_1.mp4';

		var ffmpeg = exec(command, function(err, stdout, stderr) {
			if (err) {
				rejected('ffmpeg exec error');
			}
		});

		setTimeout(function () {
			ffmpeg.stderr.on('data', function() {
				ffmpeg.stdin.setEncoding('utf8');
				ffmpeg.stdin.write('q');
			});
		}, 20000);
	}, 1000);

});*/


'use strict';

var _this = this;

var puppeteer = require('puppeteer');

(function callee$0$0() {
	var browser, page;
	return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				context$1$0.next = 2;
				return regeneratorRuntime.awrap(puppeteer.launch());

			case 2:
				browser = context$1$0.sent;
				context$1$0.next = 5;
				return regeneratorRuntime.awrap(browser.newPage());

			case 5:
				page = context$1$0.sent;
				context$1$0.next = 8;
				return regeneratorRuntime.awrap(page.goto('http://example.com'));

			case 8:
				context$1$0.next = 10;
				return regeneratorRuntime.awrap(page.screenshot({ path: 'example.png' }));

			case 10:
				context$1$0.next = 12;
				return regeneratorRuntime.awrap(browser.close());

			case 12:
			case 'end':
				return context$1$0.stop();
		}
	}, null, _this);
})();


// var record = require('./pe');
//
// record({
// 	browser: null, // Optional: a puppeteer Browser instance,
// 	page: null, // Optional: a puppeteer Page instance,
// 	output: 'output.webm',
// 	fps: 60,
// 	frames: 60 * 5, // 5 seconds at 60 fps
// 	prepare: function (browser, page) { /* executed before first capture */ },
// 	render: function (browser, page, frame) { /* executed before each capture */ }
// }).than(function() {
//
// });
//
