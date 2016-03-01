import Em from 'ember';

// windows, navigator

var WIDTH = "800",
	HEIGHT = "600";

export default Em.View.extend({

	isCameraSupported: Em.computed(function () {
		return navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia;
	}),

	readValue: null,

	initCamera: Em.on('didInsertElement', function () {
		if (!this.get('isCameraSupported')) {
	    	console.log('browser has no camera support');			
			return;
		}

		qrcode.callback = function (text) {
			console.log('value read: %@'.fmt(text));
			this.set('readValue', text);
			//this.initCanvas(250, 190);
		}.bind(this);
		
		var $video = this.$('video')[0],
			context = this.initCanvas(WIDTH, HEIGHT).getContext("2d");

    	context.clearRect(0, 0, WIDTH, HEIGHT);

		var success = function (stream) {
		    $video.src = window.URL.createObjectURL(stream);
		    this.decode($video, context);
		}.bind(this);
		var error = function (error) {
		    console.log('errow while initializing camera', error);
		};

		// init camera
		Em.run.once('afterRender', function () {
            navigator.webkitGetUserMedia({video: true, audio: false}, success, error);
		});

	}),

	initCanvas: function (width, height) {
		var $canvas = this.$('#qr-canvas')[0];
		$canvas.style.width = width + "px";
    	$canvas.style.height = height + "px";
    	$canvas.width = width;
    	$canvas.height = height;
    	return $canvas;
	},

	decode: function ($video, context) {
		if (this.get('readValue')) { return; }
		try {
			context.drawImage($video, 0, 0);
			console.log('trying to decode image.....');
			qrcode.decode();
		} catch(error) {}
		Em.run.later(this, this.decode, $video, context, 500);
	}
});