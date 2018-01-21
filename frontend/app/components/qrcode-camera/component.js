import Em from 'ember';

// windows, navigator

var WIDTH = "800",
	HEIGHT = "600";

export default Em.Component.extend({
    classNames: ['qrcode-camera'],

    readValue: null,

    stream: null,

    $video: Em.computed(function() {
        return this.$('video').get(0);
    }),

    $canvas: Em.computed(function() {
        let $canvas = this.$('#qr-canvas').get(0);
        $canvas.width = WIDTH;
        $canvas.height = HEIGHT;
        return $canvas.getContext('2d');
    }),

    isCameraSupported: Em.computed(function() {
		return navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia;
	}),

	initCamera: Em.on('didInsertElement', function() {
		if (!this.get('isCameraSupported')) {
            return;
		}

        qrcode.callback = (text) => {
            this.set('readValue', text);
            this.pauseCamera();
        };

        this.playCamera();
	}),

    playCamera() {
        let $video = this.get('$video'),
            $canvas = this.get('$canvas');

        this.set('readValue', null);

        let success = (stream) => {
            this.set('stream', stream);
            $video.src = window.URL.createObjectURL(stream);
            this.decode($video, $canvas);
        };

        let error = function() {
            //console.log('Error while initializing camera', e);
        };

        // init camera
        Em.run.once('afterRender', function() {
            const options = {
                video: {
                    facingMode: "environment"
                }, 
                audio: false
            };
            navigator.mediaDevices.getUserMedia(options).then(success).catch(error);
        });

    },

    pauseCamera() {
        this.get('$canvas').clearRect(0, 0, WIDTH, HEIGHT);
        this.get('$video').pause();
        this.get('stream').getTracks().get('firstObject').stop();
    },

	decode($video, $canvas) {
		if (!qrcode.callback || this.get('readValue')) { return; }
		try {
            $canvas.drawImage($video, 0, 0);
			qrcode.decode();
		} catch(error) {
            // TODO: treat error
        }
		Em.run.later(this, this.decode, $video, $canvas, 700);
	},

    destroyCamera: Em.on('willDestroyElement', function() {
        qrcode.callback = null;
        this.pauseCamera();
    }),
    
    actions: {
        rescan() {
            this.playCamera();
        }
    }
});