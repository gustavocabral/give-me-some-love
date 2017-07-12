import Em from 'ember';

// windows, navigator

var WIDTH = "800",
	HEIGHT = "600";

export default Em.Component.extend({
    classNames: ['qrcode-camera'],

    readValue: null,

    stream: null,

    $video: null,

	isCameraSupported: Em.computed(function () {
		return navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia;
	}),

	initCamera: Em.on('didInsertElement', function () {
		if (!this.get('isCameraSupported')) {
	    	console.log('browser has no camera support');			
			return;
		}

		let $video = this.$('video').get(0),
            canvas = this.getCanvas();

        this.set('$video', $video);

		qrcode.callback = (text) => {
			console.log(`value read: ${text}`);
			this.set('readValue', text);
            this.stopCamera();
		};

		let success = (stream) => {
            this.set('stream', stream);
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

    stopCamera: function() {
        this.get('$video').pause();
        this.get('stream').getTracks().get('firstObject').stop();
    },

	getCanvas: function () {
        let $canvas = this.$('#qr-canvas').get(0);
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

    destroyCamera: Em.on('willDestroyElement', function () {
        qrcode.callback = null;
        this.stopCamera();
    })
});