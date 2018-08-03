'use strict';

var _require = require('child_process');

var spawn = _require.spawn;

var puppeteer = require('puppeteer');

module.exports.record = function callee$0$0(options) {
	var browser, page, ffmpegPath, fps, outFile, args, ffmpeg, closed, i, screenshot;
	return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
		while (1) switch (context$1$0.prev = context$1$0.next) {
			case 0:
				context$1$0.t0 = options.browser;

				if (context$1$0.t0) {
					context$1$0.next = 5;
					break;
				}

				context$1$0.next = 4;
				return regeneratorRuntime.awrap(puppeteer.launch());

			case 4:
				context$1$0.t0 = context$1$0.sent;

			case 5:
				browser = context$1$0.t0;
				context$1$0.t1 = options.page;

				if (context$1$0.t1) {
					context$1$0.next = 11;
					break;
				}

				context$1$0.next = 10;
				return regeneratorRuntime.awrap(browser.newPage());

			case 10:
				context$1$0.t1 = context$1$0.sent;

			case 11:
				page = context$1$0.t1;
				context$1$0.next = 14;
				return regeneratorRuntime.awrap(options.prepare(browser, page));

			case 14:
				ffmpegPath = options.ffmpeg || 'ffmpeg';
				fps = options.fps || 60;
				outFile = options.output;
				args = ffmpegArgs(fps);

				if ('format' in options) args.push('-f', options.format);else if (!outFile) args.push('-f', 'matroska');

				args.push(outFile || '-');

				ffmpeg = spawn(ffmpegPath, args);

				if (options.pipeOutput) {
					ffmpeg.stdout.pipe(process.stdout);
					ffmpeg.stderr.pipe(process.stderr);
				}

				closed = new Promise(function (resolve, reject) {
					ffmpeg.on('error', reject);
					ffmpeg.on('close', resolve);
				});
				i = 1;

			case 24:
				if (!(i <= options.frames)) {
					context$1$0.next = 36;
					break;
				}

				if (options.logEachFrame) console.log('[puppeteer-recorder] rendering frame ' + i + ' of ' + options.frames + '.');

				context$1$0.next = 28;
				return regeneratorRuntime.awrap(options.render(browser, page, i));

			case 28:
				context$1$0.next = 30;
				return regeneratorRuntime.awrap(page.screenshot({ omitBackground: true }));

			case 30:
				screenshot = context$1$0.sent;
				context$1$0.next = 33;
				return regeneratorRuntime.awrap(write(ffmpeg.stdin, screenshot));

			case 33:
				i++;
				context$1$0.next = 24;
				break;

			case 36:

				ffmpeg.stdin.end();

				context$1$0.next = 39;
				return regeneratorRuntime.awrap(closed);

			case 39:
			case 'end':
				return context$1$0.stop();
		}
	}, null, this);
};

var ffmpegArgs = function ffmpegArgs(fps) {
	return ['-y', '-f', 'image2pipe', '-r', '' + +fps, '-i', '-', '-c:v', 'libvpx', '-auto-alt-ref', '0', '-pix_fmt', 'yuva420p', '-metadata:s:v:0', 'alpha_mode="1"'];
};

var write = function write(stream, buffer) {
	return new Promise(function (resolve, reject) {
		stream.write(buffer, function (error) {
			if (error) reject(error);else resolve();
		});
	});
};