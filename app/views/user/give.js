import Em from 'ember';

// windows, navigator

export default Em.View.extend({

	cameraSupport: Em.computed(function () {
		return navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia;
	}),

	canvasContext: null,

	video: null,

	initCamera: Em.on('didInsertElement', function () {
		var cameraSupport = this.get('cameraSupport');
		if (!cameraSupport) {
	    	//console.log('browser has no camera support');			
			return;
		}
		
		var $video = this.$('video')[0],
			$canvas = this.$('canvas')[0],
			canvasContext = $canvas.getContext("2d");
    	
		// Clear canvas
    	canvasContext.clearRect(0, 0, 800, 600);
    	this.set('canvasContext', canvasContext);
    	this.set('video', $video);

		// qrcode.callback = function (value) {
		// 	this.set('readValue', value);
		// }.bind(this);

		var success = function (stream) {
		    $video.src = window.URL.createObjectURL(stream);
		    setTimeout(this.drawToCanvas.bind(this), 500);
		}.bind(this);
		var error = function (error) {
		    console.log('errow while initializing camera', error);
		};

		// init camera
	    //cameraSupport({video: true, audio: false}, success, error);
	    navigator.webkitGetUserMedia({video: true, audio: false}, success, error);
	}),

	drawToCanvas: function () {
		var canvasContext = this.get('canvasContext'),
			$video = this.get('video');
		try {
		    canvasContext.drawImage($video, 0, 0);
			//qrcode.decode();
		}
		catch(error) {       
	        console.log('Error while drawing to canvas', error);
		}
		setTimeout(this.drawToCanvas, 500);
	}
});