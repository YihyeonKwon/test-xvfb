var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
var webdriver = require('selenium-webdriver');
var By = webdriver.By;
var chrome = require('selenium-webdriver/chrome');
var chromeOption = new chrome.Options();
var driver = null;
require('chromedriver');// 2.32.3

var capture = {};
capture.cardPlayerStart = function () {
	console.log('cardPlayerStart');
	if (driver === null) {
		chromeOption.addArguments('--start-fullscreen');
		chromeOption.addArguments('--disable-infobars');
		chromeOption.addArguments('--disable-notifications');

		driver = new webdriver.Builder()
		.forBrowser('chrome')
		.setChromeOptions(chromeOption)
		.build();

		setTimeout(function () {
			console.log(12123123);
			driver.get('https://tyle.io/player/r4goi5fmzwgox7');
		}, 1000);
	}
};

capture.startFfmpegPromise = function (params) {
	return new Promise(function (resolved, rejected) {
		console.log('startFfmpegPromise');

		var command = '';
		command += 'ffmpeg -y -f x11grab -draw_mouse 0 -video_size 900x900 -i :44+0,120 -vcodec libx264 -pix_fmt yuv420p -preset ultrafast -r 60 -crf 15 -tune zerolatency -filter:a "volume=1.0" -c:a aac -strict experimental -ac 2 -b:a 192k /home/ubuntu/dev/test-xvfb/test_1.mp4';

		try {
			// exec 으로 실행
			global.ffmpeg = exec(command, function(err, stdout, stderr) {
				if (err) {
					rejected('ffmpeg exec error');
				}
			});

			global.record_status = 'recording';
			resolved(params);
		} catch (e) {
			rejected();
		};
	});
};

capture.stopFfmpeg = function () {
	return new Promise(function (resolved, rejected) {
		try {
			global.ffmpeg.stderr.on('data', function() {
				global.ffmpeg.stdin.setEncoding('utf8');
				global.ffmpeg.stdin.write('q');

				resolved();
			});
		} catch (e) {
			rejected();
		}
	});
};

module.exports = capture;