import Em from 'ember';

// windows, navigator

var WIDTH = "800",
	HEIGHT = "600";

export default Em.Component.extend({
    classNames: ['qrcode-camera'],

    readValue: null,

	isCameraSupported: Em.computed(function () {
		return navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia;
	}),

	initCamera: Em.on('didInsertElement', function () {
		if (!this.get('isCameraSupported')) {
	    	console.log('browser has no camera support');			
			return;
		}

		let $video = this.$('video')[0],
            canvas = this.getCanvas();

		qrcode.callback = (text) => {
			console.log('value read: %@'.fmt(text));
			this.set('readValue', text);
            $video.pause();
		};

		let success = (stream) => {
		    $video.src = window.URL.createObjectURL(stream);
            this.decode($video, canvas);
		};

		var error = function (error) {
		    console.log('Error while initializing camera', error);
		};

		// init camera
		Em.run.once('afterRender', function () {
            navigator.webkitGetUserMedia({video: true, audio: false}, success, error);
		});
	}),

	getCanvas: function () {
        let $canvas = this.$('#qr-canvas')[0];
        $canvas.width = WIDTH;
        $canvas.height = HEIGHT;
        return $canvas.getContext('2d');
	},

	decode: function ($video, canvas) {
		if (!qrcode.callback || this.get('readValue')) { return; }
		try {
            canvas.drawImage($video, 0, 0);
			console.log('Trying to decode image.....');
			qrcode.decode();
		} catch(error) {}
		Em.run.later(this, this.decode, $video, canvas, 700);
	},

    stopCamera: Em.on('didDestroyElement', function () {
        qrcode.callback = null;
    })
});