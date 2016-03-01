import Em from 'ember';

// windows, navigator

var WIDTH = "800",
	HEIGHT = "600";

export default Em.View.extend({

	isCameraSupported: Em.computed(function () {
		return navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia;
	}),

	initCamera: Em.on('didInsertElement', function () {
		if (!this.get('isCameraSupported')) {
	    	console.log('browser has no camera support');			
			return;
		}

		qrcode.callback = function (text) {
			console.log('value read: %@'.fmt(text));
			this.set('readValue', text);
		}.bind(this);
		
		var $video = this.$('video')[0],
			$canvas = this.$('#qr-canvas')[0];
		
		$canvas.style.width = WIDTH + "px";
    	$canvas.style.height = HEIGHT + "px";
    	$canvas.width = WIDTH;
    	$canvas.height = HEIGHT;

    	var context = $canvas.getContext("2d");
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

	decode: function ($video, context) {
		try {
			context.drawImage($video, 0, 0);
			try { 
				console.log('tying to decode image.....');
				qrcode.decode();
			} catch (e1) {
				console.log('Error while decoding', e1);
				setTimeout(this.decode, 500, $video, context);
			}
		} catch(error) {       
	        console.log('Error while drawing to canvas', error);
			setTimeout(this.decode, 500, $video, context);
		}
	}
});